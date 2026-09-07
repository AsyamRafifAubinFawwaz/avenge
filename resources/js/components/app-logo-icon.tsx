import type { SVGAttributes } from 'react';
import logo from '../../assets/logo.png';
export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img src={logo} alt="" />
    );
}
