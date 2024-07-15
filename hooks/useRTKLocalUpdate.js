import { useDispatch } from 'react-redux';

const useRTKLocalUpdate = () => {
    const dispatch = useDispatch();

    const handleLocalRTKUpdate = ({ apiObjectRef, endpoint, args = undefined, updateReceipe, field = undefined, isArray = false }) => {
        // console.log('handleLocalUpdate', apiObjectRef, endpoint, args, updateReceipe, field, isArray);
        dispatch(
            apiObjectRef.util.updateQueryData(endpoint, args, (draft) => {
                // console.log("draft: ", JSON.stringify(draft), args);
                if (isArray) {
                    const index = draft.findIndex((item) => item.id === updateReceipe.id);
                    if (index !== -1) {
                        draft[index] = updateReceipe;
                    }
                } else if (field) {
                    draft[field] = updateReceipe;
                } else {
                    return updateReceipe;
                }
            })
        );
    };

    return [handleLocalRTKUpdate];
};

export { useRTKLocalUpdate };
