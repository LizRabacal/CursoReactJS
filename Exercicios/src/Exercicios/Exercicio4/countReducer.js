 const countReducer = (state, action) => {
    switch (action.type) {
        case "add":
            return state + 1;
        case "subtract":
            return state - 1;
        case "zerar":
            return state = 0;
    }
}

export default countReducer;