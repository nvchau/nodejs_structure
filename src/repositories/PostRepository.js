'use strict'

const posts = [
    {
        id: 1,
        title: 'First post',
        content: 'This is content of the first post',
        userId: 1
    },
    {
        id: 2,
        title: 'Second post',
        content: 'This is content of the second post',
        userId: 2
    },
    {
        id: 3,
        title: 'Third post',
        content: 'This is content of the third post',
        userId: 1
    }
]

const comments = [
    {
        id: 1,
        content: 'This is a comment',
        postId: 1,
        userId: 2
    },
    {
        id: 2,
        content: 'Hello',
        postId: 1,
        userId: 3
    },
    {
        id: 3,
        content: 'How are you?',
        postId: 2,
        userId: 1
    },
    {
        id: 4,
        content: 'My name is Chau',
        postId: 3,
        userId: 2
    }
]

class PostRepository {
    constructor() {}

    getAll() {
        return posts
    }

    create({ title, content, authorId }) {
        const newPost = { 
            id: posts.length + 1,
            title,
            content,
            authorId: authorId
        }

        posts.push(newPost)

        return newPost
    }

    detail({ id }) {
        return posts.find(post => post.id === id)
    }

    update({ id, title, content, userId }) {
        const post = posts.find(post => (post.id === id && post.userId === userId))

        if (!post) {
            return false
        }

        post.title = title
        post.content = content

        return post
    }

    delete({ id, userId }) {
        try {
            const post = posts.find(post => (post.id === id && post.userId === userId))

            if (!post) {
                return false
            }

            const index = posts.indexOf(post)
            posts.splice(index, 1)

            return true
        } catch (error) {
            return false
        }
    }

    allCommentsByPostId({ id }) {
        return comments.filter(comment => comment.postId === id)
    }

    createComment({ id, content, userId }) {
        try {
            const post = posts.find(post => post.id === id)

            if (!post) {
                return false
            }

            const newComment = {
                content: content,
                postId: id,
                userId: userId,
            }

            comments.push(newComment)

            return newComment
        } catch (error) {
            return false
        }
    }

    getOneCommentByIdAndPostId({ id, commentId }) {
        try {
            const comment = comments.find(comment => (comment.id === commentId && comment.postId === id))
            
            if (!comment) {
                return false
            }

            return comment
        } catch (error) {
            return false
        }
    }

    updateComment({ id, commentId, content, userId }) {
        const comment = comments.find(
            comment => (comment.id === commentId && comment.postId === id && comment.userId === userId)
        )
            
        if (!comment) {
            return false
        }

        comment.content = content

        return comment
    }

    deleteComment({ id, commentId, userId }) {
        try {
            const comment = comments.find(
                comment => (comment.id === commentId && comment.postId === id && comment.userId === userId)
            )

            if (!comment) {
                return false
            }

            const index = comments.indexOf(comment)
            comments.splice(index, 1)

            return true
        } catch (error) {
            return false
        }
    }

    likeComment({ id, commentId }) {
        try {
            const comment = comments.find(
                comment => (comment.id === commentId && comment.postId === id)
            )

            if (!comment) {
                return false
            }

            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = PostRepository