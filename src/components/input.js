function Input(props) { //onSubmit은 form을 제출했을 때 무엇을 할 것인가?를 결정 
    return (
        <form onSubmit={props.handleSubmit}>
            <label>
                Todo &nbsp;
                <input type="text" 
                    required={true} 
                    value={props.input} 
                    onChange={props.handleInput} />
            </label>
            <input type="submit" value="Create" />
        </form>
    )
}

export default Input;

