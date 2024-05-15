function Message(){
    // Declaring a constant variable to use in the message. The variable is named 'name'.
    const name = 'Alonzo'

    // Using the variable within HTML tags to display a message. It will say "Hello Alonzo".
    if (name)
        return <h1>Hello {name}</h1>;
    return <h1>Hello World</h1>
}

export default Message;
