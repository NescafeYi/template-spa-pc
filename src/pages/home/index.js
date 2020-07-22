import Head from '@/app/head';
import styles from './styles.module.less';



export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Head />
                <p className={styles.cssTest} >Home</p>
            </div >
        );
    }
}