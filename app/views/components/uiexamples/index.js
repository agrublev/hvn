import { Checkbox, FontIcon, SelectField, SelectionControl, SVGIcon, Switch, TextField } from 'react-md';
import React from 'react';

// import { CELCIUS } from 'constants/unicode';
// import './_styles.scss';
// import TimeSlider from './TimeSlider';
// import WeatherIcon from './WeatherIcon';
// import WeatherTemperatureIcon from './WeatherTemperatureIcon';
//
// import copyright from 'icons/copyright.svg';
// import PropTypes from 'prop-types';
//
// import arrowDropDown from 'icons/arrow_drop_down.svg';
// import { pastries } from 'constants/sampleData';
// import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
//
const CountersAndText = () => (
    <div className="md-grid">
        <h4 className="md-cell md-cell--12">Counters</h4>
        <TextField
            id="floating-label-counter-field"
            label="Type words"
            placeholder="Words words words"
            maxLength={20}
            className="md-cell md-cell--bottom"
        />
        <TextField
            id="multiline-counter-field"
            label="Type many words"
            placeholder="Words words words"
            rows={2}
            maxLength={200}
            className="md-cell md-cell--bottom"
        />
        <h4 className="md-cell md-cell--12">Help Text</h4>
        <TextField
            id="floating-label-help-text-field"
            label="Type words"
            placeholder="Words words words"
            className="md-cell md-cell--top"
            helpText="Look at me. I am always here!"
        />
        <TextField
            id="floating-label-focus-help-text-field"
            label="Type words"
            placeholder="Words words words"
            className="md-cell md-cell--top"
            helpOnFocus
            helpText="I magically appear when the user focuses the text field."
        />
        <TextField
            id="placeholder-help-text-counter-field"
            label="Counter and text"
            placeholder="Words words words"
            className="md-cell md-cell--top"
            maxLength={40}
            helpText="I have help text and a counter. It is quite amazing."
        />
        <h4 className="md-cell md-cell--12">Errors and Error Text</h4>
        <TextField
            id="floating-label-error-text-field"
            label="Constant error"
            placeholder="Words words words"
            className="md-cell md-cell--top"
            error
            errorText="Uh oh! It looks like there is a constant error on this field. It should somehow be fixed."
        />
        <TextField
            id="floating-label-required-error-text-field"
            required
            label="Required field"
            placeholder="Words words words"
            className="md-cell md-cell--top"
            helpText="Try to focus and blur this field without adding any input. Then add some content."
            errorText="This field is required."
        />
        <TextField
            id="floating-label-icon-counter-error-text-field"
            label="Icon and counter"
            placeholder="Words words words"
            className="md-cell md-cell--top"
            leftIcon={<FontIcon>feedback</FontIcon>}
            maxLength={40}
            helpText="The icons also gain the error state."
        />
    </div>
);
//
// // const InfoIcon = () => <FontIcon>info</FontIcon>;
// // const StarIcon = () => <FontIcon>star</FontIcon>;
//
// // const Simple1 = () => (
// {/*<div className="md-grid">*/}
// {/*<List className="md-cell md-paper md-paper--1">*/}
// {/*<ListItem primaryText="Inbox"/>*/}
// {/*<ListItem primaryText="Starred"/>*/}
// {/*<ListItem primaryText="Sent Mail"/>*/}
// {/*<ListItem primaryText="Drafts"/>*/}
// {/*</List>*/}
// {/*<List className="md-cell md-paper md-paper--1">*/}
// {/*<Subheader primaryText="Folders"/>*/}
// {/*<ListItem*/}
// {/*leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>}/>}*/}
// {/*rightIcon={<InfoIcon/>}*/}
// {/*primaryText="Photos"*/}
// {/*secondaryText="Jan 9, 2014"*/}
// {/*/>*/}
// {/*<ListItem*/}
// {/*leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>}/>}*/}
// {/*rightIcon={<InfoIcon/>}*/}
// {/*primaryText="Recipes"*/}
// {/*secondaryText="Jan 17, 2014"*/}
// {/*/>*/}
// {/*<ListItem*/}
// {/*leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>}/>}*/}
// {/*rightIcon={<InfoIcon/>}*/}
// {/*primaryText="Work"*/}
// {/*secondaryText="Jan 28, 2014"*/}
// {/*/>*/}
// {/*<Divider inset/>*/}
// {/*<Subheader primaryText="Files"/>*/}
// {/*<ListItem*/}
// {/*leftAvatar={<Avatar suffix="blue" icon={<FontIcon>insert_drive_file</FontIcon>}/>}*/}
// {/*rightIcon={<InfoIcon/>}*/}
// {/*primaryText="Vacation itinerary"*/}
// {/*secondaryText="Jan 20, 2014"*/}
// {/*/>*/}
// {/*<ListItem*/}
// {/*leftAvatar={<Avatar suffix="amber" icon={<FontIcon>insert_photo</FontIcon>}/>}*/}
// {/*rightIcon={<InfoIcon/>}*/}
// {/*primaryText="Kitchen remodel"*/}
// {/*secondaryText="Jan 10, 2014"*/}
// {/*/>*/}
// {/*</List>*/}
// {/*<List className="md-cell md-paper md-paper--1">*/}
// {/*<Subheader primaryText="Three line example" primary/>*/}
// {/*<ListItem*/}
// {/*leftAvatar={<Avatar suffix="deep-purple">B</Avatar>}*/}
// {/*rightIcon={<StarIcon/>}*/}
// {/*primaryText="Brunch this weekend?"*/}
// {/*secondaryText={'Ali Connors\nI\'ll be in your neighborhood sometime this week'}*/}
// {/*threeLines*/}
// {/*/>*/}
// {/*<ListItem*/}
// {/*leftAvatar={<Avatar suffix="green">Q</Avatar>}*/}
// {/*rightIcon={<StarIcon/>}*/}
// {/*primaryText="Summer BBQ"*/}
// {/*secondaryText={'to Alex, Scott, Jennifer\nWish I could come, but I\'m out of town this weekend.'}*/}
// {/*threeLines*/}
// {/*/>*/}
// {/*<ListItem*/}
// {/*leftAvatar={<Avatar suffix="orange">A</Avatar>}*/}
// {/*rightIcon={<StarIcon/>}*/}
// {/*primaryText="Oui Oui"*/}
// {/*secondaryText="Sandra Adams - Do you have Paris recommendations? Have you ever been?"*/}
// {/*threeLines*/}
// {/*/>*/}
// {/*</List>*/}
// {/*<List className="md-cell md-paper md-paper--1">*/}
// {/*<ListItem primaryText="Additional information"/>*/}
// {/*<ListItem primaryText="Website" renderChildrenOutside>*/}
// {/*<Button icon primary>public</Button>*/}
// {/*</ListItem>*/}
// {/*<ListItem primaryText="Mail" renderChildrenOutside>*/}
// {/*<Button icon>mail</Button>*/}
// {/*</ListItem>*/}
// {/*<ListItem*/}
// {/*leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>}/>}*/}
// {/*primaryText="Work"*/}
// {/*secondaryText="Jan 28, 2014"*/}
// {/*renderChildrenOutside*/}
// {/*>*/}
// {/*<Button icon>share</Button>*/}
// {/*</ListItem>*/}
// {/*</List>*/}
// {/*</div>*/}
// // );
//
// const chat = <FontIcon key="chat">chat</FontIcon>;
//
// const CLASS_NAME = 'md-cell md-cell--6 md-paper md-paper--1';
//
// // const SimpleListControls = () => (
// {/*<div className="md-grid">*/}
// {/*<List className={CLASS_NAME}>*/}
// {/*<ListItemControl*/}
// {/*rightIcon={chat}*/}
// {/*primaryAction={(*/}
// {/*<Checkbox*/}
// {/*id="list-control-chat-1"*/}
// {/*name="list-control-primary"*/}
// {/*label="Line Item 1"*/}
// {/*defaultChecked*/}
// {/*/>*/}
// {/*)}*/}
// {/*/>*/}
// {/*<ListItemControl*/}
// {/*rightIcon={chat}*/}
// {/*primaryAction={*/}
// {/*<Checkbox*/}
// {/*id="list-control-chat-2"*/}
// {/*name="list-control-primary"*/}
// {/*label="Line Item 2"*/}
// {/*/>*/}
// {/*}*/}
// {/*/>*/}
// {/*<ListItemControl*/}
// {/*rightIcon={chat}*/}
// {/*primaryAction={(*/}
// {/*<Checkbox*/}
// {/*id="list-control-chat-3"*/}
// {/*name="list-control-primary"*/}
// {/*label="Line Item 3"*/}
// {/*defaultChecked*/}
// {/*/>*/}
// {/*)}*/}
// {/*/>*/}
// {/*</List>*/}
// {/*<List className={CLASS_NAME}>*/}
// {/*<ListItemControl*/}
// {/*leftAvatar={<Avatar suffix="deep-blue">D</Avatar>}*/}
// {/*secondaryAction={*/}
// {/*<Checkbox*/}
// {/*id="list-control-secondary-1"*/}
// {/*name="list-control-secondary"*/}
// {/*label="Line Item 1"*/}
// {/*labelBefore*/}
// {/*defaultChecked*/}
// {/*/>*/}
// {/*}*/}
// {/*/>*/}
// {/*<ListItemControl*/}
// {/*leftAvatar={<Avatar suffix="brown">W</Avatar>}*/}
// {/*secondaryAction={*/}
// {/*<Checkbox*/}
// {/*id="list-control-secondary-2"*/}
// {/*name="list-control-secondary"*/}
// {/*label="Line Item 2"*/}
// {/*labelBefore*/}
// {/*/>*/}
// {/*}*/}
// {/*/>*/}
// {/*<ListItemControl*/}
// {/*leftAvatar={<Avatar suffix="teal">T</Avatar>}*/}
// {/*secondaryAction={*/}
// {/*<Checkbox*/}
// {/*id="list-control-secondary-3"*/}
// {/*name="list-control-secondary"*/}
// {/*label="Line Item 3"*/}
// {/*labelBefore*/}
// {/*defaultChecked*/}
// {/*/>*/}
// {/*}*/}
// {/*/>*/}
// {/*</List>*/}
// {/*<List className={CLASS_NAME}>*/}
// {/*<ListItemControl*/}
// {/*leftIcon={<FontIcon key="wifi">wifi</FontIcon>}*/}
// {/*secondaryAction={*/}
// {/*<Switch*/}
// {/*id="toggle-wifi"*/}
// {/*name="services"*/}
// {/*label="Wi-Fi"*/}
// {/*labelBefore*/}
// {/*defaultChecked*/}
// {/*/>*/}
// {/*}*/}
// {/*/>*/}
// {/*<ListItemControl*/}
// {/*leftIcon={<FontIcon key="bluetooth">bluetooth</FontIcon>}*/}
// {/*secondaryAction={*/}
// {/*<Switch*/}
// {/*id="toggle-bluetooth"*/}
// {/*name="services"*/}
// {/*label="Bluetooth"*/}
// {/*labelBefore*/}
// {/*/>*/}
// {/*}*/}
// {/*/>*/}
// {/*<ListItem*/}
// {/*primaryText="Data Usage"*/}
// {/*leftIcon={<FontIcon key="data">data_usage</FontIcon>}*/}
// {/*/>*/}
// {/*</List>*/}
// {/*</div>*/}
// // );
//
// const makeWeather = (temperature, wind, rain) => ({temperature, wind, rain});
//
// /**
//  * A really simple _data source_ for getting weather data at a specific time. I'm
//  * too lazy to make amazing data and different time points, so it will only update
//  * each hour. The hours are also on a 24h scale for simplicity.
//  */
// const DATA_SOURCE = {
//     5: makeWeather(17, 10, 8),
//     6: makeWeather(17, 12, 12),
//     7: makeWeather(17, 12, 36),
//     8: makeWeather(18, 14, 29),
//     9: makeWeather(19, 15, 29),
//     10: makeWeather(20, 19, 57),
//     11: makeWeather(21, 19, 48),
//     12: makeWeather(23, 21, 48),
//     13: makeWeather(23, 21, 48),
//     14: makeWeather(22, 18, 48),
//     15: makeWeather(21, 18, 10),
//     16: makeWeather(21, 17, 10),
//     17: makeWeather(20, 17, 10),
//     18: makeWeather(19, 10, 48),
//     19: makeWeather(18, 15, 33),
//     20: makeWeather(17, 14, 10),
//     21: makeWeather(16, 19, 8),
//     22: makeWeather(16, 13, 5),
//     23: makeWeather(16, 13, 0)
// };
//
// // export default class WeatherCard extends PureComponent {
// //     constructor () {
// //         super();
// //
// //         this.state = {
// //             time: null,
// //             ...DATA_SOURCE[12]
// //         };
// //     }
// //
// //     componentWillMount () {
// //         let language = 'en-US';
// //         // if (__CLIENT__) {
// //         //     language = window.navigator.userLanguage || window.navigator.languages || 'en-US';
// //         // }
// //
// //         this._formatter = new Intl.DateTimeFormat(language, {
// //             weekday: 'short',
// //             hour: '2-digit',
// //             minute: '2-digit'
// //         });
// //
// //         const today = new Date();
// //         today.setDate(1);
// //         today.setSeconds(0);
// //         today.setMinutes(30);
// //         today.setHours(12);
// //         this.setState({time: today});
// //     }
// //
// //     updateWeather = (v) => {
// //         const value = v + 5;
// //         const hour = Math.floor(value);
// //         const minute = value % 1 ? 30 : 0;
// //         const time = new Date(this.state.time);
// //         time.setHours(hour);
// //         time.setMinutes(minute);
// //
// //         this.setState({time, ...DATA_SOURCE[hour]});
// //     };
// //
// //     render () {
// //         const {time, temperature, wind, rain} = this.state;
// //         return (
// //             <Card className="cards__weather">
// //                 <CardTitle title="San Francisco" subtitle={`${this._formatter.format(time)}, Mostly Sunny`}/>
// //                 <CardText className="cards__weather__temperature">
// //                     <h4 className="md-display-4 cards__weather__degrees">{temperature}</h4>
// //                     <h5 className="md-display-2 cards__weather__celcius">{CELCIUS}</h5>
// //                     {/*<WeatherIcon icon="day-cloudy" big/>*/}
// //                 </CardText>
// //                 <List>
// //                     {/*<ListItem primaryText={`${wind} km/h`} leftIcon={<WeatherIcon icon="strong-wind" yellow={false}/>}/>*/}
// //                     {/*<ListItem primaryText={`${rain}%`} leftIcon={<WeatherIcon icon="rain" yellow={false}/>}/>*/}
// //                 </List>
// //                 {/*<TimeSlider onChange={this.updateWeather}/>*/}
// //                 <List ordered className="weather-list">
// //                     <ListItem primaryText="Tuesday" rightIcon={<WeatherTemperatureIcon min={12} max={24}/>}/>
// //                     <ListItem primaryText="Wednesday" rightIcon={<WeatherTemperatureIcon min={14} max={22}/>}/>
// //                     <ListItem primaryText="Thursday" rightIcon={
// //                         <WeatherTemperatureIcon min={15} max={25} sunny={false}/>}/>
// //                 </List>
// //                 <CardActions className="md-divider-border md-divider-border--top">
// //                     <Button flat secondary>Full Report</Button>
// //                 </CardActions>
// //             </Card>
// //         );
// //     }
// // }
//
// // const Raised = () => (
// {/*<div className="buttons__group">*/}
// {/*<h5>Theme Examples</h5>*/}
// //     <Button raised>Hello, World!</Button>
// //     <Button raised primary iconClassName="fa fa-hand-spock-o">Spock</Button>
// //     <Button raised secondary iconBefore={false} iconClassName="fa fa-hand-paper-o">
// //         Paper
// //     </Button>
// //     <Button raised primary iconEl={<SVGIcon use={copyright.url}/>}>react-md</Button>
// //     <Button raised secondary iconBefore={false} iconEl={<SVGIcon use={copyright.url}/>}>
// //         react-md
// //     </Button>
// //     <h5>Disabled Examples</h5>
// //     <Button raised disabled>Disabled Button</Button>
// //     <Button raised disabled iconChildren="close">Disabled Button</Button>
// //     <h5>Theme Swapped Examples</h5>
// {/*<Button raised primary swapTheming>Hello</Button>*/}
// {/*<Button raised secondary swapTheming>World</Button>*/}
// {/*</div>*/}
// // );
//
// // const OrientationExamples = () => (
// {/*<div className="md-grid">*/}
// {/*<DatePicker*/}
// {/*id="appointment-date-auto"*/}
// {/*label="Select an appointment date"*/}
// {/*className="md-cell"*/}
// {/*/>*/}
// {/*<DatePicker*/}
// {/*id="appointment-date-portrait"*/}
// {/*label="Portrait mode"*/}
// {/*className="md-cell"*/}
// {/*displayMode="portrait"*/}
// {/*/>*/}
// {/*<DatePicker*/}
// {/*id="appointment-date-landscape"*/}
// {/*label="Landscape mode"*/}
// {/*className="md-cell"*/}
// {/*displayMode="landscape"*/}
// {/*/>*/}
// {/*</div>*/}
// // );
//
const NUMBER_ITEMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const STRING_ITEMS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const OBJECT_ITEMS = [{
    label: 'Apples',
    value: 'A'
}, {
    label: 'Bananas',
    value: 'B'
}, {
    label: 'Cherries',
    value: 'C'
}, {
    label: 'Durian',
    value: 'D'
}, {
    label: 'Elderberry',
    value: 'E'
}];

const icon = <div/>;

const Simple = ({simplifiedMenu}) => (
    <div className="md-grid">
        <h4 className="md-cell md-cell--12">Normal SelectFields</h4>
        <SelectField
            id="select-field-1"
            label="Numbers"
            placeholder="Placeholder"
            className="md-cell"
            menuItems={NUMBER_ITEMS}
            simplifiedMenu={simplifiedMenu}
        />
        <SelectField
            id="select-field-2"
            label="Strings"
            placeholder="Placeholder"
            className="md-cell"
            menuItems={STRING_ITEMS}
            simplifiedMenu={simplifiedMenu}
        />
        <SelectField
            id="select-field-3"
            label="Objects"
            placeholder="Placeholder"
            className="md-cell"
            menuItems={OBJECT_ITEMS}
            simplifiedMenu={simplifiedMenu}
        />
        <h4 className="md-cell md-cell--12">SelectField Buttons</h4>
        <SelectField
            id="select-field-4"
            placeholder="Numbers button"
            className="md-cell"
            menuItems={NUMBER_ITEMS}
            position={SelectField.Positions.BELOW}
            simplifiedMenu={simplifiedMenu}
        />
        <SelectField
            id="select-field-5"
            placeholder="Strings button"
            className="md-cell"
            menuItems={STRING_ITEMS}
            position={SelectField.Positions.BELOW}
            simplifiedMenu={simplifiedMenu}
        />
        <SelectField
            id="select-field-6"
            placeholder="Objects button"
            className="md-cell"
            menuItems={OBJECT_ITEMS}
            position={SelectField.Positions.BELOW}
            simplifiedMenu={simplifiedMenu}
        />
        <h4 className="md-cell md-cell--12">Using SVGIcons</h4>
        <SelectField
            id="select-field-7"
            label="Numbers"
            placeholder="Placeholder"
            className="md-cell md-cell--bottom"
            menuItems={NUMBER_ITEMS}
            dropdownIcon={icon}
            simplifiedMenu={simplifiedMenu}
        />
        <SelectField
            id="select-field-8"
            placeholder="Strings button"
            className="md-cell md-cell--bottom"
            menuItems={STRING_ITEMS}
            position={SelectField.Positions.BELOW}
            dropdownIcon={icon}
            simplifiedMenu={simplifiedMenu}
        />
        <SelectField
            id="select-field-9"
            placeholder="Strings disabled"
            className="md-cell md-cell--bottom"
            menuItems={STRING_ITEMS}
            disabled
            dropdownIcon={icon}
            simplifiedMenu={simplifiedMenu}
        />
    </div>
);

// Simple.propTypes = {
//     simplifiedMenu: PropTypes.bool
// };
const Combined = () => (
    <div className="specialWindow"><CountersAndText/>
        <Simple/></div>
);

const SimpleCheckboxesAndSwitches = () => (
    <div>
        <SelectionControl
            id="checkbox-read-documentation-page"
            name="simple-checkboxes[]"
            label="Open SelectionControl documentation page"
            type="checkbox"
            value="documentation"
            defaultChecked
        />
        <Checkbox
            id="checkbox-read-material-design-spec"
            name="simple-checkboxes[]"
            label="Read Material Design Specifications"
            value="material-design"
        />
        <SelectionControl
            id="checkbox-impossible"
            name="simple-checkboxes[]"
            label="Achieve 100% cross-browser compatibility"
            type="checkbox"
            value="impossible"
            disabled
        />
        <SelectionControl
            id="switch-lights"
            type="switch"
            label="Turn the lights on"
            name="lights"
            defaultChecked
        />
        <Switch
            id="switch-power"
            type="switch"
            label="Power outage"
            name="power"
            disabled
        />
    </div>
);

// const SimpleContinuousSliders = () => (
// <div>
//     <Slider id="continuous-plain-slider"/>
//     <Slider id="continuous-default-value-slider" label="Default value slider" defaultValue={20}/>
{/*<Slider id="continuous-disabled-slider" label="Disabled slider" disabled/>*/}
{/*<Slider id="continuous-disabled-default-value-slider" label="Disabled slider" disabled defaultValue={50}/>*/}
{/*</div>*/}
// );

// export default class InlineAutocomplete extends Component {
//     state = {quantity: 0, pastry: ''};
//
//     handleSubmit = (e) => {
//         e.preventDefault();
//     };
//
//     selectPastry = (pastry) => {
//         this.setState({pastry});
//     };
//
//     updateQuantity = (quantity) => {
//         this.setState({quantity});
//     };
//
//     /**
//      * Some browsers don't respect the `type="number"`
//      */
//     fixQuantity = () => {
//         const quantity = Math.min(50, Math.max(0, parseInt(this.state.quantity, 10)));
//         if (this.state.quantity !== quantity) {
//             this.setState({quantity});
//         }
//     };
//
//     render () {
//         const {pastry, quantity} = this.state;
//
//         return (
//             <form
//                 id="never-gonna-make-you-up-form"
//                 name="never-gonna-bake-you-up"
//                 onSubmit={this.handleSubmit}
//                 className="md-grid"
//             >
//                 <h3 className="md-title md-cell md-cell--12">
//                     Never Gonna Bake You Up
//                 </h3>
//                 <Autocomplete
//                     id="bakery-pastry"
//                     label="Specify your pastry"
//                     placeholder={pastries[0]}
//                     inline
//                     required
//                     value={pastry}
//                     data={pastries}
//                     className="md-cell md-cell--6 md-cell--4-phone"
//                     errorText="A pastry is required!"
//                     onBlur={this.handleBlur}
//                     onChange={this.selectPastry}
//                     onAutocomplete={this.selectPastry}
//                 />
//                 <TextField
//                     id="bakery-pastry-amount"
//                     type="number"
//                     label="Quantity"
//                     placeholder="12"
//                     min={0}
//                     max={50}
//                     required
//                     value={quantity}
//                     className="md-cell md-cell--6 md-cell--4-phone"
//                     onBlur={this.fixQuantity}
//                     onChange={this.updateQuantity}
//                 />
//                 <Button
//                     type="submit"
//                     raised
//                     secondary
//                     className="md-cell--right md-cell--bottom"
//                     disabled={quantity < 1 || quantity > 50 || !pastry}
//                 >
//                     Order
//                 </Button>
//             </form>
//         );
//     }
// }

export default Combined;
