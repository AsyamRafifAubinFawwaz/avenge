import type { ImgHTMLAttributes } from 'react';
import logo from '../../assets/logo_avenge.png';
export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return <img src={logo} alt="" {...props} />;
}
