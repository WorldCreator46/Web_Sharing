function getNum(){
    return window.number;
}
function setList(num=0){    
    if(num==0)
        window.number = $("#numbers").data("number");
    else
        window.number = num;
    $('.FileName>a,td.Volume').text("\u00a0");
    for(var i = 0; i < 15; i++){
        try{
            FileName = $(`[name=${i+1}]>.FileName>a`);
            FileName.text(window.filelistdata[getNum()][i][0]);
            $(`[name=${i+1}]>.Volume`).text(window.filelistdata[getNum()][i][1]);
        }
        catch{
            break;
        }
    }
    $(`.slot`).css({"color":"black", "font-weight":"normal"});
    $(`[name=${getNum()%5}].slot`).css({"color":"red", "font-weight":"bold"});
}
function setText(textList){
    textList.forEach(function(item,index){
        $(`[name=${index}].slot`).text(item);
    })
}
function getFirstSlot(){
    return parseInt($(`[name=0].slot`).text());
}
function getLastSlot(){
    return parseInt($(`[name=4].slot`).text());
}
function search(){
    let word = $("#SB").val().trim()
    if(word != ""){
        location.href = `\\search\\${$("#SB").val()}`;
    }
    if(word.includes(" ")){
        location.href = `\\search\\and\\${$("#SB").val()}`;
    }    
    if(word != "," && word.includes(",")){
        location.href = `\\search\\or\\${$("#SB").val()}`;
    }
}
jQuery(function() {
    window.filelistdata = $("#list").data("filelistdata");
    $("#list").removeAttr("data-filelistdata");
    console.log(window.filelistdata);
    PageLimit = window.filelistdata.length;
    setList();
    $(`.FileName>a`).on('click', function(){
        $(this).attr("href", `\\download\\${this.innerHTML}`);
    });
    $('.slot').on('click', function(){
        Page_number = parseInt(this.innerHTML) - 1;
        if(Page_number < PageLimit){
            setList(Page_number);
        }
    });    
    $('.PageNumber').on('click', function(){
        button_name = this.getAttribute("name");
        if(button_name == "Start"){
            setText(["1", "2", "3", "4", "5"]);
            setList(num=0);
        }
        else if(button_name == "LeftJump"){
            Firstnumber = getFirstSlot();
            if(Firstnumber != 1){
                setText([Firstnumber-5, Firstnumber-4, Firstnumber-3, Firstnumber-2, Firstnumber-1]);
            }
            setList(getFirstSlot()-1);
        }
        else if(button_name == "End"){
            if(PageLimit%5-1 == 0) setText([PageLimit, PageLimit+1, PageLimit+2, PageLimit+3, PageLimit+4]);
            else if(PageLimit%5-1 == 1) setText([PageLimit-1, PageLimit, PageLimit+1, PageLimit+2, PageLimit+3]);
            else if(PageLimit%5-1 == 2) setText([PageLimit-2, PageLimit-1, PageLimit, PageLimit+1, PageLimit+2]);
            else if(PageLimit%5-1 == 3) setText([PageLimit-3, PageLimit-2, PageLimit-1, PageLimit, PageLimit+1]);
            else if(PageLimit%5-1 == -1) setText([PageLimit-4, PageLimit-3, PageLimit-2, PageLimit-1, PageLimit]);
            setList(parseInt(PageLimit-1));
        }
        else if(button_name == "RightJump"){
            Lastnumber = getLastSlot();
            if(Lastnumber<=PageLimit){
                setText([Lastnumber+1, Lastnumber+2, Lastnumber+3, Lastnumber+4, Lastnumber+5]);
                setList(getFirstSlot()-1);
            }            
        }
    });
    $('#header>button').on('click', function(){
        location.href = `\\sort\\${this.getAttribute("id")}`;
    });
});