// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";

const postsData = {
    allPosts: [],
    currentPost: {},
    text: 'ALGO',
    firebasePosts: {}
}


const posts = (state = postsData, action) => {
    // console.error("ENTRA");
    switch (action.type) {
        case 'FETCH_POSTS':
            return {
                ...state,
                allPosts : action.payload
            };
        case 'FETCH_TEXTO':
            return {
                ...state,
                text: action.payload
            };
        case 'VIEW_POST':
            return {
                ...state,
                currentPost: action.currentPost
            };
        case 'CLEAR_POST':
            return {
                ...state,
                currentPost: ""
            };
        default:
            return state
    }
}

export { posts };