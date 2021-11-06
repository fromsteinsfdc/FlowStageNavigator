import { LightningElement, api, track } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

const PATH_ITEM_CLASSES = {
    BASE: 'slds-path__item',
    CURRENT: 'slds-is-active',
    COMPLETE: 'slds-is-complete',
    INCOMPLETE: 'slds-is-incomplete'
}

export default class FlowStageIndicator extends LightningElement {
    @api currentStage;
    @api clickedStage;
    @api stages = [];

    @api 
    get stageListString() {
        return this.stages.join();
    }
    set stageListString(value) {
        this.stages = value.split(',').map(stage => stage.trim());
    }
    
    currentStageIndex;
    
    connectedCallback() {
        console.log('in connectedCallback');
        console.log('stagesListString = '+ this.stageListString);
        // Set stages
        if (this.stageListString) {
            for (let stage of this.stageListString.split(',')) {
                let trimmedStage = stage.trim();
                this.stages.push(
                    this.newStage(trimmedStage, trimmedStage === this.currentStage)
                );
            }
        }
        console.log('stages = '+ this.stages);
        this.currentStageIndex = this.stages.findIndex(stage => stage.isCurrent) || 0;
        for (let i = 0; i < this.currentStageIndex; i++) {
            this.stages[i].isComplete = true;
        }
        
        // Set clickedStage to default to the next stage in the list
        console.log('setting next stage');
        let nextStage;
        if (this.currentStageIndex < this.stages.length) {
            console.log('updating next step');            
            nextStage = this.stages[Number(this.currentStageIndex+1)].label;
            console.log('nextStage = '+ nextStage);
        }
        const attributeChangeEvent = new FlowAttributeChangeEvent(
            'clickedStage',
            nextStage
        );
        this.dispatchEvent(attributeChangeEvent);     
        console.log('done');
    }

    // get stages() {
    //     let stages = [];
    //     if (this.stageListString) {
    //         for (let stage of this.stageListString.split(',')) {
    //             let trimmedStage = stage.trim();
    //             stages.push(
    //                 this.newStage(trimmedStage, trimmedStage === this.currentStage)
    //             );
    //         }
    //     }
    //     this.currentStageIndex = stages.findIndex(stage => stage.isCurrent) || 0;
    //     for (let i = 0; i < this.currentStageIndex; i++) {
    //         stages[i].isComplete = true;
    //     }
    //     return stages;
    // }

    handleStageClick(event) {
        console.log('in handleStageClick');
        this.clickedStage = this.stages[event.currentTarget.dataset.index].label;
        console.log('clickedStage = '+ this.clickedStage);
        const attributeChangeEvent = new FlowAttributeChangeEvent(
            'clickedStage',
            this.clickedStage
        );
        this.dispatchEvent(attributeChangeEvent);
        this.dispatchEvent(new FlowNavigationNextEvent());

    }

    newStage(label, isCurrent) {
        return {
            label: label,
            isCurrent: isCurrent,
            get classString() {
                let classes = [PATH_ITEM_CLASSES.BASE];
                if (this.isCurrent) {
                    classes.push(PATH_ITEM_CLASSES.CURRENT);
                } else if (this.isComplete) {
                    classes.push(PATH_ITEM_CLASSES.COMPLETE);
                } else {
                    classes.push(PATH_ITEM_CLASSES.INCOMPLETE)
                }
                return classes.join(' ');
            }
        }
    }
}