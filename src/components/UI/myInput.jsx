import "./myInput.css"

const MyInput = ({nameRef}) => {
    return (
        <input ref={nameRef} className="myinput" />
    )
}

export default MyInput;