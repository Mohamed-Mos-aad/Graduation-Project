// ** Assets
import {service1Img, service2Img, service3Img, service4Img} from '../../../assets/images/images'
// ** Style
import style from '../../../style/pages/landing/sections/ourServices.module.css'
// ** components 
import SectionHeader from "../../../components/landing/SectionHeader";
// ** Hooks && Tools
import React from 'react'



// ** InterFaces
interface ISection{
    sectionId: string
}



function OurServices({sectionId}:ISection) {
    // ** States
    const services = [
        {img: service1Img, alt: 'تقرير الأشعة', title: 'تقرير الأشعة: ', description: ' تحليل مبدئي لصورة الأشعة المرفوعة لتقييم الحالة الصحية.'},
        {img: service2Img, alt: 'ارشادات غذائية', title: 'ارشادات غذائية: ', description: 'نصائح حول الأطعمة المسموحة والممنوعة حسب حالة المريض.'},
        {img: service3Img, alt: 'الدعم النفسي', title: 'الدعم النفسي: ', description: 'إمكانية التواصل مع أخصائي نفسي عبر رسائل مباشرة لدعم الصحة النفسية للمريض'},
        {img: service4Img, alt: 'تذكير بالأدوية والمياه', title: 'تذكير بالأدوية والمياه: ', description: 'تذكير دوري بشرب المياه وتناول الأدوية في مواعيدها المحددة.'},
    ]



    // ** Renders
    const renderServices = services.map(service => (
        <div className={style.service} key={service.title}>
            <div className={style.service_photo}>
                <img src={service.img} alt={service.alt} loading="lazy"/>
            </div>
            <div className={style.service_content}>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
            </div>
        </div>
    ))



    return (
        <>
            <section className={style.section} id={sectionId}>
                <div className={style.section_container}>
                    <SectionHeader title='خدماتنا المتخصصة لدعم صحتك' description='قدم لك مجموعة من الخدمات المتكاملة التي تهدف إلى تحسين صحتك الجسدية والنفسية'/>
                    <div className={style.our_services}>
                        {renderServices}
                    </div>
                </div>
            </section>
        </>
    )
}
export default React.memo(OurServices);