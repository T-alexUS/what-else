const dimension = "Контрагент";
const filterDim = '4072b9b2eaa3484298b4d9a38953f424';
let flag = 0;

const slidersGuid = ['23cd964f642743c7b9f928c4e0aa8837','6ecf0222640043a4b560f89bb44552cc', '0bba5eaa7c2b4429b4d6274e48f8d7fe', '2775a17ee6644bf48b34508a93b9f1d2']

let last_dim = '';

let R1_value = 0;
let R2_value = 0;
let R3_value = 0;
let R4_value = 0;

let rowNames = [];
let itogo = {};

firstLoad();

visApi().onSelectedValuesChangedListener({guid: String(Math.random().toFixed(30)), widgetGuid: filterDim }, function (filterInfo) {
    
    if (filterInfo.selectedValues[0][0] == dimension){ 
        
        flag = 1;
        last_dim = filterInfo.selectedValues[0][0];
        document.body.querySelector('#widget-'+w.general.renderTo).style.display = '';
        
        showSliders();
        
        changeItogo();
        render();
        
    }
    else {
        
        flag = 0;
        last_dim = filterInfo.selectedValues[0][0];
        document.body.querySelector('#widget-'+w.general.renderTo).style.display = 'none';
        
        hideSliders();
        
    }
    
});

//Функция рендера ползунков


function render(){
    
    TableRender({
        table: w.general,
        style: w.style,
        columns: w.data.columns,
        records: w.data.records,
        editMask: w.data.editMask,
        rowNames: rowNames,
        colNames: w.data.colNames,
        showToolbar: false
    });
    
    setColor();
}

//Функция связи переключателей и ползунков
function sliderWork(){
    if (typeof document.getElementById('r1') != 'undefined' && typeof document.getElementById('one') != 'undefined' &&
        typeof document.getElementById('r2') != 'undefined' && typeof document.getElementById('two') != 'undefined' &&
        typeof document.getElementById('r3') != 'undefined' && typeof document.getElementById('three') != 'undefined' &&
        typeof document.getElementById('r4') != 'undefined' && typeof document.getElementById('four') != 'undefined'){
           
            let r1 = document.getElementById('r1');
            let one = document.getElementById('one');
           
            
            r1.onchange=function()
            {
                
                document.getElementById('one').value = document.getElementById('r1').value;
                R1_value = Number(document.getElementById('r1').value);
                
                changeItogo();
                
                render();
                
            };
            
            one.onchange=function()
            {
                document.getElementById('r1').value = document.getElementById('one').value;
                R1_value = Number(document.getElementById('one').value);
                
                changeItogo();
                
                render();
            };
        
            
            let r2 = document.getElementById('r2');
            let two = document.getElementById('two');
            
            r2.onchange=function()
            {
                document.getElementById('two').value = document.getElementById('r2').value;
                R2_value = Number(document.getElementById('r2').value);
                
                changeItogo();
                
                render();
            };
            
            two.onchange=function()
            {
                document.getElementById('r2').value = document.getElementById('two').value;
                R2_value = Number(document.getElementById('two').value);
                
                changeItogo();
                
                render();
            }
            
            let r3 = document.getElementById('r3');
            let three = document.getElementById('three');
            
            r3.onchange=function()
            {
                
                document.getElementById('three').value = document.getElementById('r3').value;
                R3_value = Number(document.getElementById('r3').value);
                
                changeItogo();
                
                render();
            };
            
            three.onchange=function()
            {
                document.getElementById('r3').value = document.getElementById('three').value;
                R3_value = Number(document.getElementById('three').value);
                
                changeItogo();
                
                render();
            }
            
            let r4 = document.getElementById('r4');
            let four = document.getElementById('four');
            
            r4.onchange=function()
            {
                document.getElementById('four').value = document.getElementById('r4').value;
                R4_value = Number(document.getElementById('r4').value);
                
                changeItogo();
                
                render();
            };
            
            four.onchange=function()
            {
                document.getElementById('r4').value = document.getElementById('four').value;
                R4_value = Number(document.getElementById('four').value);
                
                changeItogo();
                
                render();
            }
            
    }
}

function waitForLoad(widgetGuid, iter){
    visApi().onWidgetLoadedListener({guid:String(Math.random().toFixed(30)), widgetGuid:widgetGuid}, function(){
        iter === slidersGuid.length-1 ? sliderWork() : waitForLoad(slidersGuid[iter+1], iter+1)
    })
}

waitForLoad(slidersGuid[0], 0)

function setColor(){
    
    let first = $('#table-' + w.general.renderTo + ' tbody tr')[0];
    let head = $('#table-' + w.general.renderTo + ' thead')[0];
    $(head).css({background:'#F5F5DC'});
    $(first).css({background:'#F5F5DC', position:'sticky', top:0});
    
}
   
//Возможная функция с ошибкой
function changeItogo(){
    
    let itogo = [];
    itogo.length = 4;
    itogo.fill(0);
    
    w.data.records.forEach(function(item, index) {
        
        if( index !==0) {
            item['column 7'] = (item['column 3'] + item['column 7']) * (1 - R1_value/100) * (1 + R2_value/100) * (1 + R4_value/100) - (item['column 0'] - item['column 1'] )* (1 + R3_value/100) * (1 + R2_value/100) - item['column 1'];
            item['column 8'] =  item['column 7'] / item['column 1'];  
            item['column 9'] =  item['column 3'] * (1 - R1_value/100) * (1 + R2_value/100) * (1 + R4_value/100) - (item['column 0'] - item['column 1']) * (1 + R3_value/100) * (1 + R2_value/100) - (item['column 3'] - (item['column 0'] - item['column 1']));
            item['column 10'] = item['column 9'] / item['column 4'];
            
            itogo = itogo.map(function(item_, index_){
                return item_ + item['column '+ (index_+7)] ;
            });
            
        }

    });
    
    itogo.forEach(function(item, index){
        
        if (index == 1 || index == 3 )  w.data.records[0]['column '+ (index+7)] = item/w.data.records.length;
        else 
            w.data.records[0]['column '+(index+7)] = item;
    });
    
}

function firstLoad(){
    
    if(dimension == visApi().getWidgetByGuid(filterDim).widgetState.selectedFilterValues.values[0][0]) {
        
        flag = 1;
        preFirstRender();
        showSliders()
        render();
        
    }
    else {
        
        flag = 0;
        preFirstRender();
        hideSliders();
        document.body.querySelector('#widget-'+w.general.renderTo).style.display = 'none';
        
    }
}

function hideSliders(){
    
    document.body.querySelector('#widget-23cd964f642743c7b9f928c4e0aa8837').style.display = 'none';
    document.body.querySelector('#widget-6ecf0222640043a4b560f89bb44552cc').style.display = 'none';
    document.body.querySelector('#widget-0bba5eaa7c2b4429b4d6274e48f8d7fe').style.display = 'none';
    document.body.querySelector('#widget-2775a17ee6644bf48b34508a93b9f1d2').style.display = 'none';
}

function showSliders(){
    
    document.body.querySelector('#widget-23cd964f642743c7b9f928c4e0aa8837').style.display = '';
    document.body.querySelector('#widget-6ecf0222640043a4b560f89bb44552cc').style.display = '';
    document.body.querySelector('#widget-0bba5eaa7c2b4429b4d6274e48f8d7fe').style.display = '';
    document.body.querySelector('#widget-2775a17ee6644bf48b34508a93b9f1d2').style.display = '';
}

// function getSliderValues(){
    
//     switch(last_dim){
            
//         case 'Поставщик':
//             let table = visApi().getWidgetByGuid(table_Postavschik);
//             w.props.R1 = R1_value = table.w.props.R1;
//             w.props.R2 = R2_value = table.w.props.R2;
//             w.props.R3 = R3_value = table.w.props.R3;
//             w.props.R4 = R4_value = table.w.props.R4;
            
//     }
// }

function preFirstRender() {
    
    rowNames = w.data.rowNames.map(function(item){
        return item;
    });
    
    rowNames.unshift(['Итого']);
    
    let arr_itogo = [];
    arr_itogo.length = 11;
    arr_itogo.fill(0);
    
    w.data.records.forEach(function(item) {
        
        item['column 7'] = (item['column 3'] + item['column 7']) * (1 - R1_value/100) * (1 + R2_value/100) * (1 + R4_value/100) - (item['column 0'] - item['column 1'] )* (1 + R3_value/100) * (1 + R2_value/100) - item['column 1'];
        item['column 8'] =  item['column 7']/item['column 1'];  
        item['column 9'] =  item['column 3'] * (1 - R1_value/100) * (1 + R2_value/100) * (1 + R4_value/100) - (item['column 0'] - item['column 1']) * (1 + R3_value/100) * (1 + R2_value/100) - (item['column 3'] - (item['column 0'] - item['column 1']));
        item['column 10'] = item['column 9']/item['column 4'];
        
        arr_itogo = arr_itogo.map(function(item_, index_){
            return item_ + item['column '+ index_];
            
        });
        
    });
    
    itogo.rowNames = ['Итого'];
    itogo.recid = 0;
    
    arr_itogo.forEach(function(item, index){
        
        if (index == 6 || index == 8 || index == 10)
            itogo['column '+index] = item/w.data.records.length;
        else 
            itogo['column '+index] = item;
            
    });
     
    w.data.records.unshift(itogo);
    
}
