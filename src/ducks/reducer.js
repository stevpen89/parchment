const initialState = {
	bob:'bob'
}

export default (state = initialState, action) => {
	switch (action.type) {

	case 1:
		return { ...state }

	default:
		return state
	}
}
