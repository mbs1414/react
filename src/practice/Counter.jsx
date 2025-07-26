import SmartCounter from '../components/SmartCounter '
import './Counter.css'
const Counter = () => {
    const value = 1000
    return (
        <div className='Counter'>
            <h1>شمارنده من</h1>
            <br />
            <SmartCounter value={value}/>
            <SmartCounter>This is how you can set props children</SmartCounter>
        </div>
    )
}
export default Counter