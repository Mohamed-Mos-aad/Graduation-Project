// ** Assets
import starIcon from '../../assets/main/doctorDetails/starIcon.svg'
import doctorIcon from '../../assets/main/doctorDetails/doctorIcon.svg'
import locationPinIcon from '../../assets/main/doctorDetails/locationPinIcon.svg'
import priceIcon from '../../assets/main/doctorDetails/priceIcon.svg'
import chatIcon from '../../assets/main/doctorDetails/chatIcon.svg'
import timerIcon from '../../assets/main/doctorDetails/timerIcon.svg'
import phoneIcon from '../../assets/main/doctorDetails/phoneIcon.svg'
import leftIcon from '../../assets/main/doctorDetails/leftIcon.svg'
import rightIcon from '../../assets/main/doctorDetails/leftIcon.svg'
// ** Style
import style from '../../style/pages/main/doctorDetails.module.css'
// ** Hooks
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
// ** Other
import doctorPhoto from '../../assets/landingPage/PatientReviews/PatientReview-1.png'
import Booking from '../../components/ui/Booking'
import BookingDone from '../../components/ui/BookingDone'
import { IDoctorsData } from '../../interfaces'
import { fetchDoctors } from '../../api/doctorsApi'
import Loading from '../../components/ui/loading/Loading'





export default function DoctorDetails() {
    // Defaults
    const { id } = useParams();




    // ** States
    const [doctor,setDoctor] = useState<IDoctorsData>();
    const [bookingOpened,setBookingOpened] = useState<boolean>(false);
    const [bookingDoneOpened,setBookingDoneOpened] = useState<boolean>(false);
    const [isloading,setIsLoading] = useState<boolean>(true);





    // ** Handlers
    const bookingStateToggleHanlder = (state:boolean)=>{
        if(!state)
        {
            setBookingOpened(!bookingOpened)
        }
    };





    // ** Renders
    const renderFirstDayTabel = ()=>{
        if(doctor)
        {
            return doctor.availability[0].map((day,index) =>(
                <li className={day.status ? style.time_done : ''} key={`first${index}`} onClick={()=>{bookingStateToggleHanlder(day.status)}}>
                    من {day.time}
                    <br />حتى{doctor.availability[0]?.[index+1]?.time}
                </li>
            ))
        }
        return null
    }
    const renderSecondDayTabel = ()=>{
        if(doctor)
        {
            return doctor.availability[1].map((day,index) =>(
                <li className={day.status ? style.time_done : ''} key={`second${index}`} onClick={()=>{bookingStateToggleHanlder(day.status)}}>
                    من {day.time}
                    <br />حتى{doctor.availability[1]?.[index+1]?.time}
                </li>
            ))
        }
        return null
    }
    const renderThirdDayTabel = ()=>{
        if(doctor)
        {
            return doctor.availability[2].map((day,index) =>(
                <li className={day.status ? style.time_done : ''} key={`third${index}`} onClick={()=>{bookingStateToggleHanlder(day.status)}}>
                    من {day.time}
                    <br />حتى{doctor.availability[2]?.[index+1]?.time}
                </li>
            ))
        }
        return null
    }





    // ** UseEffect
    useEffect(()=>{
        const loadDoctor = async ()=>{
            try{
                const doctorData = await fetchDoctors();
                if(id)
                {
                    setDoctor(doctorData.doctors[id])
                }
            }
            catch(error)
            {
                console.log(error)
            }
            finally
            {
                setIsLoading(false);
            }
        }
        loadDoctor();
    },[id]);


    


    return (
        <>
        {
            isloading ? 
                <Loading />
            :
            <div className={style.doctor_details_container}>
                <div className={style.doctor_details}>
                    <div className={style.doctor_photo}>
                        <img src={doctorPhoto} alt="" />
                    </div>
                    <div className={style.doctor_data}>
                        <div className={style.doctor_title}>
                            <h1>{doctor?.name}</h1>
                            <h2>{doctor?.specialty}</h2>
                            <div className={style.doctor_rate}>
                                <img src={starIcon} alt="star icon" />
                                <img src={starIcon} alt="star icon" />
                                <img src={starIcon} alt="star icon" />
                                <img src={starIcon} alt="star icon" />
                                <img src={starIcon} alt="star icon" />
                            </div>
                            <h3>التقيم العام من {doctor?.rating.avg_rating} زائراً للدكتور</h3>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <img src={doctorIcon} alt="doctor icon" />
                                    <div><span>{doctor?.specialty}</span></div>
                                </li>
                                <li>
                                    <img src={locationPinIcon} alt="locationPin icon" />
                                    <div>{doctor?.location}</div>
                                </li>
                                <li>
                                    <img src={priceIcon} alt="price icon" />
                                    <div>الكشف: <span>{doctor?.price}</span></div>
                                </li>
                                <li>
                                    <img src={chatIcon} alt="chat icon" />
                                    <div>لتواصل شات مجاناً اضغط (<Link to={'/'}>هنا</Link>)</div>
                                </li>
                                <li>
                                    <img src={timerIcon} alt="timer icon" />
                                    <div>مده الانتظار: 50 دفيفة</div>
                                </li>
                                <li>
                                    <img src={phoneIcon} alt="phone icon" />
                                    <div>16568- سعر مكالمة عاديه</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={style.doctor_time_tables}>
                    <button><img src={leftIcon} alt="left icon" /></button>
                    <div className={style.tables}>
                        <div className={style.table}>
                            <ul>
                                <li>
                                    اليوم  
                                </li>
                                {renderFirstDayTabel()}
                            </ul>
                        </div>
                        <div className={style.table}>
                            <ul>
                                <li>
                                    غداً  
                                </li>
                                {renderSecondDayTabel()}
                            </ul>
                        </div>
                        <div className={style.table}>
                            <ul>
                                <li>
                                    اليوم الثالث
                                </li>
                                {renderThirdDayTabel()}
                            </ul>
                        </div>
                    </div>
                    <button><img src={rightIcon} alt="right icon" /></button>
                </div>
                {
                    bookingOpened &&
                    <Booking setBookingOpened={setBookingOpened} setBookingDoneOpened={setBookingDoneOpened}/>
                }
                {
                    bookingDoneOpened &&
                    <BookingDone />
                }
            </div>
        }
        </>
    )
}
