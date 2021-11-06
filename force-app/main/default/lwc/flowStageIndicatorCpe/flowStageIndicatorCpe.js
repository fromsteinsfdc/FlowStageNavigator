import { LightningElement, api, track } from 'lwc';
import { screenContainsFlowStageIndicator } from 'c/flowStageIndicatorUtils';

export default class FlowStageIndicatorCpe extends LightningElement {

    @api elementInfo;
    @api builderContext;

    // @track inputValues = {
    //     buttons: { value: null, valueDataType: DATA_TYPE.STRING, isCollection: false, label: 'Buttons' },
    //     label: { value: null, valueDataType: DATA_TYPE.STRING, isCollection: false, label: 'Label' },
    //     cssString: { value: null, valueDataType: DATA_TYPE.STRING, isCollection: false, label: 'CSS String' },
    //     alignment: { value: this.alignments.default.value, valueDataType: DATA_TYPE.STRING, isCollection: false, label: 'Alignment' },
    //     orientation: { value: this.orientations.default.value, valueDataType: DATA_TYPE.STRING, isCollection: false, label: 'Orientation' },
    //     showLines: { value: this.showLines.default.value, valueDataType: DATA_TYPE.STRING, isCollection: false, label: 'Display horizontal line(s)' },
    //     actionMode: { value: this.actionModes.default.value, valueDataType: DATA_TYPE.STRING, isCollection: false, label: 'Action mode' },
    //     required: { value: this.yesNo.default.value, valueDataType: DATA_TYPE.STRING, isCollection: false, label: 'Required' },
    //     multiselect: { value: this.yesNo.default.value, valueDataType: DATA_TYPE.STRING, isCollection: false, label: 'Multi-select' },
    //     defaultValue: { value: null, valueDataType: DATA_TYPE.STRING, isCollection: false, label: 'Default value' }
    // };

    stageListInputTypeOptions = [
        { label: 'String', value: 'string' },
        { label: 'Collection', value: 'collection' }
    ];

    /*
    get builderContext() {
        return this._builderContext;
    }
    set builderContext(value) {
        this._builderContext = value;
        console.log(JSON.stringify(this.builderContext));
        for (let screen of this.builderContext.screens) {
            // console.log('in screen '+ screen.name);
            for (let field of screen.fields) {
                // console.log('screen field '+ inputField.name +': '+ JSON.stringify(inputField));
                if (field.name === this.elementInfo.apiName) {
                    console.log('I, field '+ field.name +' am in screen '+ screen.name +', which has '+ screen.fields.length +' total screen components');
                }
            }
        }
    }
    _builderContext;
    */

    get screen() {
        return this.builderContext.screens.find(screen =>
            screen.fields.find(field =>
                field.name === this.elementInfo.apiName)
        );
    }

    connectedCallback() {
        console.log('elementInfo: '+ JSON.stringify(this.elementInfo));
        console.log(JSON.stringify(Object.keys(this.builderContext)));
        // console.log(JSON.stringify(this.builderContext.variables));
        for (let [key, value] of Object.entries(this.builderContext)) {
            // console.log(key +': '+ JSON.stringify(value));
        }
        for (let screen of this.builderContext.screens) {
            console.log(screen.name.toUpperCase());
            for (let field of screen.fields) {
                console.log('- Field -- '+ field.name);
                //console.log('-- '+ field)
                for (let [key, value] of Object.entries(field)) {
                    //console.log(key + ': ' + JSON.stringify(value));
                    
                }
            }
        }
        let stageIndicator = this.screen.fields.find(field => field.extensionName === 'c:flowStageIndicator');
        if (stageIndicator) {
            console.log('Found a stageIndicator! Its called ' + stageIndicator.name);
            console.log(JSON.stringify(stageIndicator));
        }

        screenContainsFlowStageIndicator(this.builderContext, this.elementInfo);
    }

}