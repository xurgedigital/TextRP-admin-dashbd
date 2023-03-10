import React, { useState, useEffect } from 'react'
import Edit from "@public/Icons/edit.svg";
import Image from "next/image";
import axios from "axios";
import { useRouter } from 'next/router';
import Button from '@/components/UI/Button';
import Loader from '@/components/common/Loader';
interface IRowprops {
    id: number
    name: string,
    description: string,
    available_credits: number,
}

const SubscriptionComp = () => {
    const [subscriptionData, setSubscriptionData] = useState<IRowprops[]>([])
    const [loading, setLoading] = useState(false)
    const [fetch, setFetch] = useState(false)
    const router = useRouter()



    const getSubscriptions = () => {
        setLoading(true)
        axios.get("/api/admin/subscriptions").then((res) => {
            setSubscriptionData(res.data.data)
            setLoading(false)
        }).catch(
            (err) => {
                console.log(err);
                setLoading(false)
                if (err.response.status === 401) {
                    localStorage.clear()
                    router.push("/login")
                }
            }
        )
    };

    useEffect(() => {
        getSubscriptions()
    }, [fetch])



    const Row = (props: IRowprops) => {
        const { id, name, description, available_credits } = props
        const [isEditable, setIsEditable] = useState(false)
        const [credits, setCredits] = useState(available_credits)
        const [descript, setDescript] = useState(description)
        const [isSaving, setIsSaving] = useState(false)

        const updateSubscription = () => {
            setIsSaving(true)
            axios.post(`/api/admin/subscriptions/${id}`, {
                name: name,
                description: descript,
                available_credits: credits
            }).then((res) => {
                setIsSaving(false)
                setIsEditable(prev => !prev)
                setFetch(prev => !prev)
                console.log("update_subscription", res)
            }).catch(
                (err) => {
                    setIsSaving(false)
                    console.log(err);
                }
            )
        };

        return (
            <tr className="text-sm font-normal ">
                <td className='pb-4 capitalize'>
                    {isEditable ?
                        <div className='flex items-start h-[9.5rem]'>{name}</div> : <span>{name}</span>
                    }
                </td>
                <td className='pb-4'>
                    {
                        isEditable ? (
                            <div className='w-full flex flex-col justify-start h-[9.5rem] pr-3'>
                                <textarea
                                    rows={3}
                                    placeholder={description}
                                    value={descript}
                                    onChange={(e) => setDescript(e.target.value)}

                                    className={`p-3 min-w-[17rem] rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
                                />
                                <div className='flex items-center gap-2 mt-4'>
                                    <Button loading={isSaving} onClick={updateSubscription} className=" px-6 py-2  rounded">{"Save"}</Button>
                                    <Button onClick={() => {
                                        setDescript(description)
                                        setCredits(available_credits)
                                        setIsEditable(prev => !prev)
                                    }} variant="blueOutline" className=" px-6 py-2 rounded">{"Cancel"}</Button>
                                </div>
                            </div>
                        ) : (
                            <span>
                                {description}
                            </span>
                        )}
                </td>
                <td className='pb-4 text-secondary-text'>
                    {
                        isEditable ? (
                            <div className='w-full flex items-start h-[9.5rem] pr-3'>
                                <input
                                    placeholder={"Ex. 6"}
                                    value={credits}
                                    onChange={(e) => setCredits(Number(e.target.value))}
                                    className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
                                />
                            </div>
                        ) : (
                            <span>
                                {available_credits}
                            </span>
                        )}
                </td>
                {/* <td className='pb-4 text-secondary-text'>
                    {
                        isEditable ? (
                            <div className='w-full flex items-start h-[9.5rem]'>
                                <input
                                    placeholder={price}
                                    value={price}
                                    className={`p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`}
                                />
                            </div>
                        ) : (
                            <span>
                                {price}
                            </span>
                        )}
                </td> */}
                <td className='pb-4'>
                    <div onClick={() => setIsEditable(prev => !prev)} className={`${isEditable ? "hidden" : "flex"} cursor-pointer flex w-full justify-end`}>
                        <Image
                            src={Edit}
                            alt={"edit"}
                            className=""
                            quality={100}
                        />
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <div className='w-full'>
            <p className='text-2xl font-semibold'>Subscription Pricing</p>
            <div className=" w-full inline-block align-middle ">
                <div className=' overflow-auto shadow-shadow-tertiary rounded-lg p-6 pb-2 bg-white mt-3'>
                    <table className="table-auto ">
                        <thead>
                            <tr className='text-sm font-semibold'>
                                <th> <div className='min-w-[9rem] text-left mb-4'>Package Name</div></th>
                                <th> <div className='min-w-[9rem] text-left mb-4'>Package Description</div></th>
                                <th> <div className='min-w-[9rem] text-left mb-4'>Number of Credits</div></th>
                                {/* <th> <div className='min-w-[9rem] text-left mb-4'>Price (in USD $) </div></th> */}
                                <th> <div className='w-10 mb-4'></div> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptionData && subscriptionData?.length > 0 && subscriptionData.map((si, i) => (
                                <Row {...si} key={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
                {loading ? (
                    <div className='w-full flex justify-center items-center p-6 bg-white'>
                        <Loader />
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default SubscriptionComp