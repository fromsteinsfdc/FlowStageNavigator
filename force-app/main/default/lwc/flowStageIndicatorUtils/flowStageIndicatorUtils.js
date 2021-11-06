const fsiComponentName = 'c:flowStageIndicator';
const valueLabel = 'value';

const getCurrentScreen = (builderContext, elementInfo) => {
    return builderContext.screens.find(screen => 
        screen.fields.find(field => 
            field.name === elementInfo.apiName)
    );
}

const getScreenFlowStageIndicators = (builderContext, elementInfo) => {
    let currentScreen = getCurrentScreen(builderContext, elementInfo);    
    return currentScreen.fields.filter(field => field.extensionName === fsiComponentName);
}

const screenContainsFlowStageIndicator = (builderContext, elementInfo) => {
    console.log('in screenContainsFlowStageIndicator');
    let currentScreen = builderContext.screens.find(screen => 
        screen.fields.find(field => 
            field.name === elementInfo.apiName)
    );

    if (currentScreen) {
        let stageIndicators = currentScreen.fields.filter(field => field.extensionName === fsiComponentName);
        let returnValues = [];
        for (let stageIndicator of stageIndicators) {
            console.log('found stageIndicator');
            let fsiDetails = {};
            for (let param of stageIndicator.inputParameters) {
                fsiDetails[param.name] = getValue(builderContext, param.value);
            }
            let currentIndex = fsiDetails.stages.findIndex(stage => stage === fsiDetails.currentStage);
            if (currentIndex > 0) {
                fsiDetails.prevStage = fsiDetails.stages[curentIndex-1];
            }
            if (currentIndex < fsiDetails.stages.length - 1) {
                fsiDetails.nextStage = fsiDetails.stages[currentIndex+1];
            }
            console.log(JSON.stringify(fsiDetails));
            returnValues.push(fsiDetails);
        }
        // console.log(JSON.stringify(returnValues));
        return returnValues;
    }
    return null;
}

// If the value is a reference, recursively find and return the value of that reference
// If the value is a literal value, return that value
const getValue = (builderContext, valueObject) => {
    if (valueObject.elementReference) {
        let referencedValue = builderContext.variables.find(variable => variable.name === valueObject.elementReference).value;
        return getValue(builderContext, referencedValue);
    } else {
        // Look for the property with 'value' in its name        
        let valueType = Object.keys(valueObject).find(valueName => valueName.toLowerCase().includes(valueLabel));
        return valueObject[valueType];
    }
}

export { getCurrentScreen, screenContainsFlowStageIndicator }