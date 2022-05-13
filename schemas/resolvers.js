const APY_KEY = process.env.API_KEY
const resolvers = {
    Query:{
        //we do not need a books query because from the user using graphql we could just retreive 
        // the books if we wanted to
        getMe: async (_,args,{dataSources:{users}},info)=>{
            return await users.getUser()
        },
        getApiKey:(_,args,context,info) => {
            if(!context.user)new AuthenticationError('User must be authenticated to access this information')
            return API_KEY
        }
    },
    Mutation:{
        signUp: async (_,args,{dataSources:{users}},info) => {
            console.log(args);
             return await users.createUser(args.input.username,args.input.email,args.input.password)
        },
        saveBook: async (_,args,{dataSources:{users}},info)=>{
            const newBook = {
                ...args.input
            }
            return await users.saveBook(newBook)
        },
        removeBook:async(_,args,{dataSources:{users}},info)=>{
            return await users.removeBook(args.bookId);
        },
        login:async(_,args,{dataSources:{users}},info) =>{
            return await users.login(args.username,args.password);
        }
    }
}

module.exports = resolvers