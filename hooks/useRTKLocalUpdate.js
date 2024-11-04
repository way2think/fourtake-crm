import { useDispatch } from 'react-redux';

const useRTKLocalUpdate = () => {
    const dispatch = useDispatch();

    const handleLocalRTKUpdate = ({ apiObjectRef, endpoint, args = undefined, updateReceipe, field = undefined, isArray = false }) => {
        try {
            if (!apiObjectRef || !apiObjectRef.util || !apiObjectRef.util.updateQueryData) {
                console.error('Invalid apiObjectRef or missing updateQueryData method:', apiObjectRef);
                return;
            }

            console.log('handleLocalRTKUpdate', args);

            dispatch(
                apiObjectRef.util.updateQueryData(endpoint, args, (draft) => {
                    // Add logging to check the state of draft
                    console.log('Draft before update:', draft);
                    console.log('Update args:', args);
                    console.log('Update recipe:', updateReceipe);

                    if (isArray) {
                        const index = draft.findIndex((item) => item.id === updateReceipe.id);
                        console.log('index in rtk', index);
                        if (index !== -1) {
                            draft[index] = updateReceipe;
                        }
                    } else if (field) {
                        draft[field] = updateReceipe;
                    } else {
                        console.log('updateRe', args);
                        // return updateReceipe;
                        // using Object.assign - bcs with object as args it is not updating, so we tried this, incase in future if we get error
                        // we check for, args which type is not updating and have it another else if and return the data
                        Object.assign(draft, updateReceipe);
                    }

                    // Add logging to check the state of draft after the update
                    console.log('Draft after update:', draft);
                })
            );
        } catch (error) {
            console.error('Error in handleLocalRTKUpdate:', error);
        }
    };

    return [handleLocalRTKUpdate];
};

export { useRTKLocalUpdate };
