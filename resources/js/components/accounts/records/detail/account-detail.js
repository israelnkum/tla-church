import React, {useEffect, useState} from 'react'
import {Affix, Card} from 'antd'
import {useSelector} from "react-redux";

function Detail() {
    const [total, setTotal] = useState(0)
    const {date, staff, comments} = useSelector(state => state.recordReducer.record)
    const {data} = useSelector(state => state.moneyReducer.moneys)

    useEffect(() => {
        setTotal(
            data.reduce((a, b) => {
                return Number(a) + Number(b.amount)
            }, 0)
        )
    }, [data]);
    return (
        <Affix offsetTop={90}>
            <Card title={date ?? ''} className={'h-fit'}>
                <div className={'flex flex-col gap-5'}>
                    <div className={'border-b'}>
                        <p className={'text-blue-600 font-medium'}>Total Amount</p>
                        <h3 className={'text-3xl font-bold'}>{total ?? 0}</h3>
                    </div>
                    <div className={'border-b'}>
                        <p className={'text-blue-600 font-medium'}>Staff</p>
                        <h3 className={'text-sm'}>{staff ?? ''}</h3>
                    </div>
                    <div>
                        <p className={'text-blue-600 font-medium'}>Comments</p>
                        <p className={'text-sm'}>{comments ?? ''}</p>
                    </div>
                </div>
            </Card>
        </Affix>
    )
}

export default Detail
