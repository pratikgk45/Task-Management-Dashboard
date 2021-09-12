import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { AgGridReact } from 'ag-grid-react';
import { projectsStyles } from '../../styles/Projects.style';
import { getProjects } from '../../service/project.service';
import TimeRenderer from '../shared/grid/cell-renderers/TimeRenderer';
import ProcessNameRenderer from '../shared/grid/cell-renderers/ProcessNameRenderer';
import ProjectActionsRenderer from '../shared/grid/cell-renderers/ProjectActionsRenderer';
import { userObjectFormatter } from '../shared/grid/formatters';
import { updateNotificationState } from '../../state-management/actions/Notification.actions';

function Projects() {

    const styles = projectsStyles();

    const [rowData, setRowData] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);

    useEffect(() => {
        const getAllProjects = async () => {
            let { data, error } = await getProjects(user.token);
            if (error) {
                error = await error.json();
                dispatch(updateNotificationState({
                    isOpen: true,
                    message: error.message,
                    type: 'error'
                }));
            } else {
                setRowData(data || []);
            }
        }
        getAllProjects();
    }, []);

    const modules = useMemo( ()=> [
        ClientSideRowModelModule, 
        RangeSelectionModule, 
        RowGroupingModule, 
        RichSelectModule], []);

    const frameworkComponents = {
        timeRenderer: TimeRenderer,
        processNameRenderer: ProcessNameRenderer,
        projectActionsRenderer: ProjectActionsRenderer
    };

    const columnDefs = useMemo(() => [
        {
            field: 'project.updatedAt',
            headerName: 'Last Updated',
            width: 260,
            cellRenderer: 'timeRenderer',
            sort: 'desc'
        },
        {
            field: 'project._id',
            headerName: 'Project ID'
        },
        {
            field: 'project.name',
            cellRenderer: 'processNameRenderer'
        },
        {
            field: 'project.description',
            width: 300
        },
        {
            field: 'project.owner',
            headerName: 'Owner',
            valueFormatter: userObjectFormatter
        },
        {
            field: 'accessible',
            headerName: '',
            cellRenderer: 'projectActionsRenderer'
        }
    ], []);

    const defaultColDef = useMemo(()=> ({
        resizable: true,
        sortable: true,
        width: 150
    }), []);

    return (
        <div className={`ag-theme-alpine ${styles.root}`}>
            <div className={styles.gridHeader}>
                <Typography
                    className={styles.gridHeaderText}
                    sx={{ fontSize: 20}}
                    fontWeight="bold"
                >
                    Projects
                </Typography>
            </div>
            <AgGridReact 
                reactUi="true"
                className="ag-theme-alpine"
                modules={modules}
                frameworkComponents={frameworkComponents}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={rowData}
            />
        </div>
    )
}

export default Projects;
