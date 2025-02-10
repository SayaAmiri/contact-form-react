export const initialState = {
    firstname: null,
    lastname: null,
    emailaddress: null,
    querytype: null,
    messagearea: null,
    acceptrules: null
}

export function reducer(state, action) {
    let stateCopy = { ...state };
    switch (action.type) {
        case "onSubmit":
            const indexTargetForSave = [0, 1, 2, 3, 5, 6];
            indexTargetForSave.forEach(index => {
                const targetItem = action.payload.target[index];
                if (index === 6) {
                    stateCopy[targetItem.name] = targetItem.checked;
                } else {
                    stateCopy[targetItem.name] = targetItem.value;
                }
                stateCopy["querytype"] = action.payload.target["querytype"].value;
            });
            break;
        case "onBlur":
            if (stateCopy[action.payload.target.name] != undefined) {
                stateCopy[action.payload.target.name] = action.payload.target.value;
            }
            break;
        case "onChange":
            if (stateCopy[action.payload.target.name] != undefined) {
                if (action.payload.target.name == "querytype") {
                    stateCopy[action.payload.target.name] = action.payload.target.value;
                } else {
                    stateCopy[action.payload.target.name] = action.payload.target.checked;
                }
            }
            break;
        default:
    }
    return stateCopy;
}