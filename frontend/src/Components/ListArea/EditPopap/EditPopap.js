import React, {useEffect, useState} from "react";
import useStyles from "./style";
import {createPortal} from "react-dom";
import {TextField, Button} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import {servicePostJson} from "../../../services";

function ModalPortal(props) {
    const classes = useStyles();
    const {children} = props;

    /**
     * Показваем плавно окна
     */
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setIsShow(true);
    },[]);

    return createPortal(
        <div className={`${classes.containerPortal} ${isShow ? classes.opacity : ''}`}>
            {children}
        </div>, document.body
    );
}

function EditPopap(props) {
    const classes = useStyles();
    const {show, onClose, onApply} = props;

    const [x, setX] = useState('');
    const [y, setY] = useState('');

    if (!show) {
        return null;
    }

    const _setX = (event) => {
        setX(event.target.value);
    };

    const _setY = (event) => {
        setY(event.target.value);
    };

    const _onApply = () => {
        if (x && y) {
            onApply({x: Number(x), y: Number(y)});
        }
    }
    return (
        <ModalPortal>
            <div className={classes.containerPopap}>
                <div className={classes.content}>
                    <div className={classes.title}>Изменение координатов</div>
                    <div className={classes.fields}>
                        <div className={classes.field}>
                            <TextField label="X" variant="outlined" type={'number'} onChange={_setX}/>
                        </div>
                        <div className={classes.field}>
                            <TextField label="Y" variant="outlined" type={'number'} onChange={_setY}/>
                        </div>
                    </div>
                    <div className={classes.buttons}>
                        <div className={classes.cancel}>
                            <Button color="secondary" size={'small'} onClick={onClose}>
                                Отмена
                            </Button>
                        </div>
                        <Button variant="contained" color="primary" size={'small'} onClick={_onApply}>
                            Применить
                        </Button>
                    </div>
                </div>
            </div>
        </ModalPortal>
    )
}

function Edit ({idItem, allReload}) {
    const [showEditPopap, setShowEditpopap] = useState(false);

    const _startEdit = () => {
        setShowEditpopap(true);
    }

    const _closeEdit = () => {
        setShowEditpopap(false);
    }

    const _onApply = async (data) => {
        const result = await servicePostJson(`/api/event/${idItem}`, data);
        if (!result) {
            alert('Ошибка обновления');
        } else {
            alert('Запись обновлена');
            _closeEdit();
            allReload();
        }
    }

    return (
        <>
         <EditIcon color={'primary'} fontSize={'small'} onClick={_startEdit}/>
         <EditPopap show={showEditPopap} onClose={_closeEdit} onApply={_onApply}/>
        </>
    )
}

export default Edit;