import { supabase } from '../lib/supabase.js';
import { generateKey } from '../utils/generateKey.js';

// --- READ ---

export const fetchBountyData = async () => {
    const { data: tasks, error } = await supabase
        .from('task')
        .select('id, title, description, primary_points, secondary_points, completed, slot, pending');
    if (error) throw error;

    const bounties = {};
    for (const task of tasks) {
        const key = generateKey(task.title);
        bounties[key] = {
            id:              task.id,
            title:           task.title,
            desc:            task.description,
            primaryPoints:   task.primary_points,
            secondaryPoints: task.secondary_points,
            completed:       task.completed,
            active:          task.slot !== null,
            slot:            task.slot ?? null,
            pending:         task.pending ?? false,
        };
    }
    return bounties;
};

export const fetchUserData = async () => {
    const { data: users, error } = await supabase
        .from('user')
        .select('id, username, pin, score');
    if (error) throw error;

    const players = {};
    for (const u of users) {
        players[generateKey(u.username)] = {
            id:    u.id,
            name:  u.username,
            pin:   u.pin,
            score: u.score,
        };
    }
    return players;
};

// --- TASK MUTATIONS ---

export const insertTask = async (title, desc, primaryPoints, secondaryPoints) => {
    const { data, error } = await supabase
        .from('task')
        .insert({
            title,
            description:      desc,
            primary_points:   primaryPoints,
            secondary_points: secondaryPoints,
            completed:        false,
        })
        .select('id')
        .single();
    if (error) throw error;
    return data.id;
};

export const updateTask = async (taskId, title, desc, primaryPoints, secondaryPoints) => {
    const { error } = await supabase
        .from('task')
        .update({
            title,
            description:      desc,
            primary_points:   primaryPoints,
            secondary_points: secondaryPoints,
        })
        .eq('id', taskId);
    if (error) throw error;
};

export const setTaskCompleted = async (taskId, completed) => {
    const { error } = await supabase
        .from('task')
        .update({ completed })
        .eq('id', taskId);
    if (error) throw error;
};

export const deleteTask = async (taskId) => {
    const { error } = await supabase
        .from('task')
        .delete()
        .eq('id', taskId);
    if (error) throw error;
};

// --- BOUNTY SLOT MUTATIONS ---

export const assignTaskToSlot = async (slotId, taskId) => {
    const { error } = await supabase
        .from('task')
        .update({ slot: slotId, pending: false })
        .eq('id', taskId);
    if (error) throw error;
};

export const clearSlotByTaskId = async (taskId) => {
    const { error } = await supabase
        .from('task')
        .update({ slot: null, pending: false })
        .eq('id', taskId);
    if (error) throw error;
};

export const setSlotPendingByTaskId = async (taskId) => {
    const { error } = await supabase
        .from('task')
        .update({ pending: true })
        .eq('id', taskId);
    if (error) throw error;
};

// --- USER MUTATIONS ---

export const insertUser = async (username, hashedPin = null) => {
    const { data, error } = await supabase
        .from('user')
        .insert({ username, pin: hashedPin, score: 0 })
        .select('id')
        .single();
    if (error) throw error;
    return data.id;
};

export const incrementUserScore = async (userId, amount) => {
    const { error } = await supabase.rpc('increment_score', {
        user_id_input: userId,
        amount_input:  amount,
    });
    if (error) throw error;
};

// --- HISTORY ---

export const fetchHistory = async () => {
    const { data, error } = await supabase
        .from('history')
        .select(`
            id,
            date,
            claimer:user!history_user_id_fkey(username),
            task(title, primary_points),
            contributor(user:user_id(username))
        `)
        .order('date', { ascending: false });
    if (error) throw error;
    return data.map(({ id, date, claimer, task, contributor }) => ({
        id,
        claimedAt:    date,
        claimer:      claimer?.username ?? 'Unknown',
        task:         task?.title ?? 'Unknown',
        points:       task?.primary_points ?? 0,
        contributors: (contributor ?? []).map(c => c.user?.username).filter(Boolean),
    }));
};

export const insertHistory = async (claimerId, taskId, contributorIds = []) => {
    const { data: historyRow, error: histError } = await supabase
        .from('history')
        .insert({ claimer_id: claimerId, task_id: taskId })
        .select('id')
        .single();
    if (histError) throw histError;

    if (contributorIds.length > 0) {
        const rows = contributorIds.map(uid => ({ user_id: uid, history_id: historyRow.id }));
        const { error: contribError } = await supabase.from('contributor').insert(rows);
        if (contribError) throw contribError;
    }
};
