export default {
    setExpandFlag: ({ commit }, payload) => {
        commit('setExpandFlag', payload)
    }, 
    setMarkerClickFlag: ({ commit }, payload) => {
        commit('setMarkerClickFlag', payload)
    }, 
    setProjects: ({commit}, payload) => {
        commit('setProjects', payload)
    }, 
    setConnectedData: ({commit}, payload) => {
        commit('setConnectedData', payload)
    }, 
    setNonConnectedData: ({commit}, payload) => {
        commit('setNonConnectedData', payload)
    }, 
    setUpcomingData: ({commit}, payload) => {
        commit('setUpcomingData', payload)
    }, 
    setMapData: ({commit}, payload) => {
        commit('setMapData', payload)
    }, 
    setLocation: ({commit}, payload) => {
        commit('setLocation', payload)
    }, 
    setOverlay: ({commit}, payload) => {
        commit('setOverlay', payload)
    }, 
    setConfig: ({commit}, payload) => {
        commit('setConfig', payload)
    }, 
    setHealth: ({commit}, payload) => {
        commit('setHealth', payload)
    }, 
    setTints: ({commit}, payload) => {
        commit('setTints', payload)
    }, 
    setCurrentProject: ({commit}, payload) => {
        commit('setCurrentProject', payload)
    }, 
}