export default {
    setExpandFlag: (state, { flag }) => {
        state.expandFlag = flag
    },
    setMarkerClickFlag: (state, { flag }) => {
        state.markerClickFlag = flag
    },
    setProjects: (state, { data }) => {
        state.projects = data
    },
    setConnectedData: (state, { data }) => {
        state.connectedData = data
    },
    setNonConnectedData: (state, { data }) => {
        state.nonConnectedData = data
    },
    setUpcomingData: (state, { data }) => {
        state.upcomingData = data
    },
    setMapData: (state, { data }) => {
        state.mapData = data
    },
    setLocation: (state, { data }) => {
        state.location = data
    },
    setOverlay: (state, { data }) => {
        state.overlay = data
    },
    setHealth: (state, { data }) => {
        state.health = data
    },
    setTints: (state, { data }) => {
        state.tints = data
    },
    setConfig: (state, { data }) => {
        state.config = data
    },
    setCurrentProject: (state, { data }) => {
        state.currentProject = data
    },
}