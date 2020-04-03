export default {
    actions: {
        async loadPosts({commit}) {
            const posts = [
                {
                    id: 1,
                    author: "Параноик",
                    text: "Коронавирус! Ай-яй-яй, всё пропало, все пропадём..."
                }, {
                    id: 2,
                    author: "Чёткий Оптимист",
                    text: "Не бздеть! Всё норм. Прорвемся. Больше шума, чем проблема."
                }
            ];
            commit("setPosts", posts);
        },
        async createPost({commit, state}, {author, text}) {
            const lastPost = state.posts.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
            const id = lastPost ? (lastPost.id + 1) : 0;
            const post = { id, author, text};
            commit("addPosts", post);
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        addPosts(state, post) {
            state.posts.push(post);
        }
    },
    state: {
        posts: [],
    },
    getters:{
        getPosts(state){
            return state.posts.reverse();
        }
    }
}