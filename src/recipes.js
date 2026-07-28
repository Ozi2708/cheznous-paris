import React from 'react';
import { CHEZNOUS_DATA } from './data.js';

/* ── Source unique des recettes ──
   Les 60 du livre sont compilées dans data.js ; celles ajoutées depuis le
   téléphone vivent ici. Tout l'app lit `useAllRecipes()` pour que les deux
   soient partout indiscernables. */

export const CN_MYRECIPES_KEY = 'cheznous_myrecipes_v1';

function load() {
  try { const v = JSON.parse(localStorage.getItem(CN_MYRECIPES_KEY)); return Array.isArray(v) ? v : []; }
  catch (e) { return []; }
}

let userRecipes = load();
let snapshot = [...CHEZNOUS_DATA.recipes, ...userRecipes];
const listeners = new Set();

function emit() {
  snapshot = [...CHEZNOUS_DATA.recipes, ...userRecipes];
  listeners.forEach(fn => fn());
}

export const cnAllRecipes = () => snapshot;
export const cnUserRecipes = () => userRecipes;
export const cnIsUserRecipe = (id) => userRecipes.some(r => r.id === id);

/* `persist: false` pour les mises à jour venues de l'autre téléphone :
   le moteur de synchro écrit déjà le localStorage de son côté. */
export function cnSetUserRecipes(list, { persist = true } = {}) {
  userRecipes = Array.isArray(list) ? list : [];
  if (persist) { try { localStorage.setItem(CN_MYRECIPES_KEY, JSON.stringify(userRecipes)); } catch (e) { /* quota */ } }
  emit();
}
export const cnAddUserRecipe = (r) => cnSetUserRecipes([...userRecipes, r]);
export const cnRemoveUserRecipe = (id) => cnSetUserRecipes(userRecipes.filter(r => r.id !== id));

/* Prochain identifiant libre, en tenant compte du livre et des ajouts. */
export function cnNextRecipeNum() {
  return snapshot.reduce((m, r) => Math.max(m, r.num || 0), 0) + 1;
}

const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
export function useAllRecipes() {
  return React.useSyncExternalStore(subscribe, cnAllRecipes, cnAllRecipes);
}
