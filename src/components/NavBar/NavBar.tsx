// ** Style
import style from '../../style/components/navbar/navbar.module.css'
// ** Assets
import logo from '../../assets/landingPage/landingPageLogo.svg'
import navBarMenuIcon from '../../assets/navBar/navBarIcon.svg'
import logOutIcon from '../../assets/navBar/logOutIcon.svg'
import settingIcon from '../../assets/navBar/settingIcon.svg'
// ** Other
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';




export default function NavBar() {
    // ** Defaults
    const navigate = useNavigate();





    // ** States
    const [navOpen,setNavOpen] = useState<boolean>(false);
    const [userLogged,setUserLogged] = useState<boolean>(false);




    // ** Handlers
    const signUpPageHandler = ()=>{navigate('/u/sign-up')};
    const signInPageHandler = ()=>{navigate('/u/sign-in')};
    const nabBarToggelHandler = ()=>{
        const menuElement = document.getElementById('menu');
        if(!navOpen && menuElement && window.innerWidth < 992)
        {
            menuElement.style.display = 'flex';
            setNavOpen(true);
        }
        else if(navOpen && menuElement)
        {
            menuElement.style.display = 'none';
            setNavOpen(false);
        }
    }
    const smoothScrollHandler = (id:string)=>{
        const sectionId = document.getElementById(id);;
        if(sectionId)
        {
            sectionId.scrollIntoView({behavior:'smooth'});
            nabBarToggelHandler();
        }
    }
    const logOutHandler = ()=>{setUserLogged(false)};
    



    return (
        <>
            <nav className={style.nav}>
                <div className={style.nav_container}>
                    <div className={style.logo}>
                        <img src={logo} alt="" />
                    </div>
                    <div className={style.mb_menu}>
                        <img src={navBarMenuIcon} alt="Nav Bar Icon" onClick={nabBarToggelHandler}/>
                    </div>
                    <div className={style.menu} id='menu'>
                        {userLogged ?
                            <ul>
                                <li className={style.active_section}>الرئيسيه</li>
                                <li>الاستشارات</li>
                                <li>النصائح</li>
                                <li>التذكيرات</li>
                            </ul>
                            :
                            <ul>
                                <li className={style.active_section} onClick={()=>{smoothScrollHandler('about-us')}}>نبذة عنّا</li>
                                <li onClick={()=>{smoothScrollHandler('join-us')}}>انضم لنا</li>
                                <li onClick={()=>{smoothScrollHandler('our-services')}}>خدماتنا</li>
                                <li onClick={()=>{smoothScrollHandler('contact-us')}}>تواصل معنا</li>
                                <li onClick={()=>{smoothScrollHandler('patient-reviews')}}>تقييمات المستخدمين</li>
                            </ul>
                        }
                    </div>
                    {userLogged ?
                        <div className={style.auth_btns}>
                            <button className={style.userLoggedIcon}><img src={settingIcon} alt="Setting icon" /></button>
                            <button className={style.userLoggedIcon} onClick={logOutHandler}><img src={logOutIcon} alt="LogOut icon" /></button>
                        </div>
                        :
                        <div className={style.auth_btns}>
                            <button onClick={signUpPageHandler}>إنشاء حساب</button>
                            <button onClick={signInPageHandler}>تسجيل دخول</button>
                        </div>
                    }
                </div>
            </nav>
        </>
    )
}
