import React, {useState} from 'react'
import {Drawer} from 'antd'
import {IoApps} from "react-icons/io5";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import TlaIcon from "../tla-icon";

export default function AppsMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const apps = [
        {
            name: 'Members',
            link: '/members',
            icon: 'doctor'
        },
        {
            name: 'Accounts',
            link: '/accounts',
            icon: 'records'
        }
    ]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const openApp = (link, app) => {
        dispatch({
            type: 'SET_CURRENT_APP',
            payload: app.toLowerCase()
        })
        setIsOpen(false)
        navigate(link)
    }
    return (
        <React.Fragment>
            <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
                <IoApps size={20} color={'#64748B'}/>
            </div>
            <Drawer width={350} title={<div>Apps</div>} mask placement="right"
                    onClose={() => setIsOpen(false)} open={isOpen}>
                <div className={'flex flex-wrap gap-3'}>
                    {
                        apps.map(({link, name, icon}) => (
                            <div key={name} onClick={() => openApp(link, name)}
                                 className={'w-1/4 hover:!text-gray-900 flex flex-col gap-2 items-center' +
                                     ' cursor-pointer justify-center hover:bg-gray-200 p-2 rounded-lg'}>
                                <TlaIcon name={icon} width={20}/>
                                <span className={'hover:text-dark'}>{name}</span>
                            </div>
                        ))
                    }
                </div>
            </Drawer>
        </React.Fragment>
    )
}
