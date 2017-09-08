import bugs from './bugs_for_test.json';

const initialState = {
    bugs: bugs
};

function homeReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

const HomeReducer = {
    home: homeReducer
};

export default HomeReducer;
