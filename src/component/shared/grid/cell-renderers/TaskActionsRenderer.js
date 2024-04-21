import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { updateNotificationState } from '../../../../state-management/actions/Notification.actions';
import EditProject from '../../../pages/EditProject';
import Popup from '../../Popup';
import { updatePopUpState } from '../../../../state-management/actions/PopUp.actions';

function TaskActionsRenderer(params) {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const user = useSelector(state => state.auth);
    const popUpState = useSelector(state => state.popUp);

    return (
        <>
            {/* <Tooltip
                title="Change Assignee"
                arrow
            >
                <IconButton
                    onClick={() => dispatch(updatePopUpState({ editTask: params.data }))}
                >
                    <EditOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Popup 
                title="Change Assignee"
                fullWidth={true}
                openPopup={popUpState.editTask === params.data}
                onClose={() => dispatch(updatePopUpState({ editTask: undefined }))}
            >
                
            </Popup> */}
        </>
    )
}

export default TaskActionsRenderer;
