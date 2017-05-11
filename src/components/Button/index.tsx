import * as RX from 'reactxp';
const { Component, Text, Types } = RX;

interface ButtonProps {
    onPress: (e: RX.Types.SyntheticEvent) => void,
    text: string, 
    color?: string,
    backgroundColor?: string
};

interface ButtonState {};

const Button = (props: ButtonProps)  => {
        const {backgroundColor, onPress, text, color} = props


        return (
           <RX.Button style={[_styles.button, backgroundColor && { backgroundColor: backgroundColor }]} title={text} onPress={onPress}>
                <Text style={[_styles.buttonText, color && { color }]}>{text}</Text>
            </RX.Button>
        );
}

const _styles = {
    button: RX.Styles.createButtonStyle({
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop:15,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 50,
        elevation: 2
    }),
    buttonText: RX.Styles.createTextStyle({
        fontSize: 24,
        color: 'white'
    })
}
export default Button;
