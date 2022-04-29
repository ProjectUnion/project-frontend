import React, { useState, useEffect, useContext } from 'react'
import '../styles/Settings.scss';
import { Context } from "../index";
import { useNavigate } from 'react-router-dom';
import UserService from '../API/UserService';
import Input from '../components/UI/input/Input';
import Textarea from '../components/UI/textarea/Textarea';
import Error from '../components/UI/error/Error';
import Loader from '../components/UI/loader/Loader';
import Button from '../components/UI/button/Button';
import Toggle from '../components/UI/toggle/Toggle';


const Settings = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate();
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [isNotification, setIsNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ntfsNewMsg, setNftsNewMsg] = useState(false);
    const [ntfsNewSubs, setNftsNewSubs] = useState(false);
    const [ntfsNewComment, setNftsNewComment] = useState(false);
    const [ntfsUpdate, setNftsUpdate] = useState(false);
    const [ntfsEmail, setNftsEmail] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        try {
            setIsLoading(true);
            const response = await UserService.fetchDataSettings(store.isUserID);

            if (response.data) {
                setDataUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setDescription(response.data.description);
            }
            
        } catch (e) {
            setIsError('Ошибка при получении данных пользователя');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        } finally {
            setIsLoading(false);
        }
    }

    async function saveData() {
        try {
            await UserService.saveData(store.isUserID, name, email, description);

            setIsNotification('Настройки успешно сохранены');
            setTimeout(() => {
                setIsNotification(null)
            }, timeout)
        } catch (e) {
            setIsError('Ошибка при сохранении данных пользователя');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
    }

    async function changePassword() {
        try {
            if (newPassword === "" || oldPassword === "" || confirmPassword === "") {
                setIsError('Вы заполнили не все поля');
                setTimeout(() => {
                    setIsError(null)
                }, timeout)
            }
            else if (newPassword !== confirmPassword) {
                setIsError('Новые пароли не совпадают');
                setTimeout(() => {
                    setIsError(null)
                }, timeout)
            }
            else if (newPassword === oldPassword) {
                setIsError('Новые пароли не отличается от старого');
                setTimeout(() => {
                    setIsError(null)
                }, timeout)
            }
            else {
                await UserService.changePassword(store.isUserID, oldPassword, newPassword);

                setIsNotification('Пароль успешно изменен');
                setTimeout(() => {
                    setIsNotification(null)
                }, timeout)

                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (e) {
            setIsError('Ошибка при изменении пароля');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
    }

    async function deleteAccount() {
        try {
            await UserService.deleteAccount(store.isUserID);

            setIsNotification('Аккаунт успешно удален');
            setTimeout(() => {
                setIsNotification(null)
            }, timeout)

            store.logout();
            navigate("/")
        } catch (e) {
            setIsError('Ошибка при удалении аккаунта');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
    }

    if (isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                <Loader/>
            </div>
        );
    }

    return (
        <div className='settings'>
            <div className="settings__header">
                <b className='title'>Настройки профиля</b>
                <Button mode='fill' onClick={saveData}>Сохранить</Button>
            </div>

            <div className="main-settings">
                <p className="title">Основные настройки</p>

                <div className="settings__item">
                    <p className='name'>Имя и фамилия</p>
                    <Input
                        placeholder="Введите имя"
                        value={name} 
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="settings__item">
                    <p className='name'>Почта</p>
                    <Input
                        placeholder="Введите почту"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="settings__item">
                    <p className='name'>Описание</p>
                    <Textarea 
                        placeholder="Введите описание"
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className="change-password">
                <p className='title'>Изменение пароля</p>

                <Input
                    type="password"
                    placeholder="Введите старый пароль"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Введите новый пароль"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Повторите новый пароль"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <Button mode='fill' onClick={changePassword}>Изменить пароль</Button>
            </div>

            <div className="notifications">
                <p className='title'>Уведомления</p>

                <Toggle 
                    text="Новые сообщения" 
                    status={ntfsNewMsg && "checked"}
                    onChange={() => setNftsNewMsg(!ntfsNewMsg)}
                />

                <Toggle 
                    text="Новые подписчики"
                    status={ntfsNewSubs && "checked"}
                    onChange={() => setNftsNewSubs(!ntfsNewSubs)}
                />

                <Toggle 
                    text="Новые комментарии к проектам"
                    status={ntfsNewComment && "checked"}
                    onChange={() => setNftsNewComment(!ntfsNewComment)}
                />

                <Toggle
                    text="Обновления платформы"
                    status={ntfsUpdate && "checked"}
                    onChange={() => setNftsUpdate(!ntfsUpdate)}
                />

                <Toggle
                    text="Уведомления на почту"
                    status={ntfsEmail && "checked"}
                    onChange={() => setNftsEmail(!ntfsEmail)}
                />
            </div>

            <div className="delete-account">
                <p onClick={deleteAccount}>Удалить аккаунт</p>
            </div>

            {store.isError &&
                <Error mode='error'>{store.isError}</Error>
            }

            {isError &&
                <Error mode='error'>{isError}</Error>
            }

            {isNotification &&
                <Error mode='success'>{isNotification}</Error>
            }
        </div>
    );
};

export default Settings;
