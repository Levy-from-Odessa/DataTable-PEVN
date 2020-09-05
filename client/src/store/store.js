import Vue from 'vue'
import Vuex from 'vuex'

import Service from '../services/ContactService'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    contacts: [],
    error: '',
    loading: false
  },
  getters: {
    contacts: state => {
      return state.contacts
    },
    error: state => {
      return state.error
    },
    loading: state => {
      return state.loading
    }
  },
  mutations: {
    SET_CONTACTS: (state, payload) => {
      state.loading = false
      state.contacts = payload;
    },
    SET_LOADING: (state) => {
      state.loading = true
    },
    SET_ERROR: (state, payload) => {
      state.error = payload
    }
  },
  actions: {
    // run loading get all contacts
    GET_CONTACTS: async (context) => {
      context.commit('SET_LOADING');
      try {
        const contacts = (await Service.contacts()).data;
        context.commit('SET_CONTACTS', contacts);
      } catch (error) {
        context.commit('SET_ERROR', error);
      }
    },
    // run loading add item to db and get all contacts
    ADD_CONTACT: async (context, payload) => {
      context.commit('SET_LOADING');
      try {
        await Service.addContact(payload)
        context.dispatch('GET_CONTACTS');
      } catch (error) {
        context.commit('SET_ERROR', error);
      }
    },
     // run loading remove item to db and get all contacts
    DEL_CONTACT: async (context, payload) => {
      context.commit('SET_LOADING');
      try {
        await Service.delContact(payload)
        context.dispatch('GET_CONTACTS');
      } catch (error) {
        context.commit('SET_ERROR', error);
      }
    },
     // run loading update item to db and get all contacts
    UPDATE_CONTACT: async (context, payload) => {
      context.commit('SET_LOADING');
      try {
        await Service.updateContact({id: payload.id, payload})
        context.dispatch('GET_CONTACTS');
      } catch (error) {
        context.commit('SET_ERROR', error);
      }
    }
  },
})
