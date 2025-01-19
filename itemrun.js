import { world, system } from "@minecraft/server";
import { ActionFormData,MessageFormData,ModalFormData } from "@minecraft/server-ui";
import { selection_HARUPAYSend, selection_quest, selection_mail, shop_stop, cashdataC, selection_kannkin} from "./main"
import { cashdataA } from "./scriptevents"
var selection_mail_import = selection_mail;
var selection_quest_import = selection_quest;
var selection_HARUPAYSend_import = selection_HARUPAYSend;
var selection_kannkin_import = selection_kannkin;
var shop_stop_import = shop_stop
function cashdataB(){
    selection_mail_import=0
    selection_quest_import=0
    selection_HARUPAYSend_import=0
    shop_stop_import=0
    selection_kannkin_import=0;
}
export function Itemrun_HARUPhone1(eventData, quest, location, rotation, rotation1, harupay_logs, shop_menu){
    system.run(() => {
        //実行アイテム=additem:haruphone1
        if (eventData.itemStack.typeId === "additem:haruphone1"){
            const player = eventData.source;
            if(player.hasTag('op')&&world.getDynamicProperty('op_fast')===undefined){
                var form = new ModalFormData();
                form.textField("初期配布金額「後から変えられません」(半角数字)", "0")
                form.show(player).then(r => {
                    if (r.canceled) {
                        return;
                    };
                    if (r.formValues[0]>100000000){
                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§4設定した金額は上限をオーバーしています.1億以下で設定してください"}]}`)
                        selection_HARUPAYSend_import = 0;
                        return;
                    }
                    if(r.formValues[0]!==''){
                        world.setDynamicProperty('start_money',r.formValues[0])
                        world.setDynamicProperty('op_fast',1)
                        world.setDynamicProperty('money_start_system1', 1);
                        return;
                    }else{
                        player.runCommand('tellraw @s {"rawtext":[{"text":"§e初期設定を完了して下さい"}]}')
                        return;
                    }
                })
            }else{
                const score = world.scoreboard.getObjective("money").getScore(player.scoreboardIdentity);
                const location = player.location;
                const {x ,y ,z}=location;
                var performance = world.getDynamicProperty('performance')
                if(performance==undefined){
                    var performance_system2=[]
                }else{
                var performance_system2 = JSON.parse(performance);
                }
                const random_performance = Math.floor(Math.random() * performance_system2.length)
            //HOME画面
            var form = new ActionFormData();
            form.title("HARUPhone1");
            form.body(`§9現在地§r:§e${Math.round(x)},${Math.round(y)},${Math.round(z)}\n§aHARUPAY残高§r:§e${score}\n--------------\n§b[アプリ一覧]`);
            if(performance_system2[0]==undefined){
                form.button(`§l広告\n§rデータなし`);
            }else{
                form.button(`§l広告§r\n${performance_system2[random_performance][2]}`);
            }
            form.button(`通知 §b`);
            form.button("§9HARU PA");
            form.button("§2HARU Account");
            form.button("Quick");
            form.button("§3メール");
            form.button("§6銀行");
            form.button("§2仕事依頼・探す");
            form.button("§5換金");
            form.button("§9購入");
            form.button("§d情報/ニュース")
            form.button("§2ブラウザ")
            form.button(`§3Advance`);
            form.button("§4通報/報告")
            form.button("§9Short§0 (試用中)\n§8現在開発中のメッセージ機能");
            form.button("§4カジノ")
            if (player.hasTag('HARUPhoneOP')) {
                form.button("§8管理者設定§8(旧アプリ)");
                form.button("§5Operator Controller");
            }
            form.show(player).then(r => {
                if (r.canceled) return;
                let response = r.selection;
                switch (response) {
                    case 0:
                        if(performance_system2[0]==undefined){
                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a広告データが見つかりません"}]}`)
                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                            return;
                        }
                        var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body(`§l${performance_system2[random_performance][3]}\n§e------------\n§r投稿者:§a${performance_system2[random_performance][0]}\n§e§l------------\n§r${performance_system2[random_performance][4]}\n\n${performance_system2[random_performance][5]}\n\n${performance_system2[random_performance][6]}\n\n${performance_system2[random_performance][7]}`);
                        form.button(`閉じる`);
                        form.show(player).then(r => {
                            if (r.canceled) return;
                        })
                    break;
                    case 1:
                        
                    break;
                    case 2:
                        //HARUPAY画面
                        var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body("HARU PAYでご利用になられるサービスを選択");
                        form.button("§2§l残高の確認");
                        form.button("§6§l送る");
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response = r.selection;
                            switch (response) {
                                case 0:
                                    //HARUPAYの残高の確認
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§a${player.name}§fのHARUPAY所持金:§l§b"},{"score":{"name":"@s","objective":"money","bold":"true"}}]}`);
                                break;
                                case 1:
                                    //サーバーが混みあった際の不具合防止
                                    if(selection_HARUPAYSend_import==1){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§eただいまサーバーが混みあっております.しばらくしてからもう一度お試しください"}]}`) 
                                        return;
                                    }
                                        var players = world.getAllPlayers()
                                        selection_HARUPAYSend_import = 1;
                                    //サーバー使用中の設定   
                                    //全プレイヤー取得
                                    //HARIPAY送信画面
                                    form = new ActionFormData();
                                    form.body("送り先のプレイヤーを選択");
                                    for (let i = 0; i < players.length; i++){
                                        form.button(`${players[i].name}`);
                                    }
                                    form.show(player).then(r => {
                                        if (r.canceled) {
                                            selection_HARUPAYSend_import = 0;
                                            return;
                                        };
                                        let response = r.selection;
                                        //playerの残高の取得
                                        const score = world.scoreboard.getObjective("money").getScore(player.scoreboardIdentity);
                                        //送信先プレイヤーの設定
                                        let partner = players[response].name
                                        //送金額設定画面
                                        form = new ModalFormData();
                                        form.textField("送金額(半角数字)", "0")
                                        form.show(player).then(r => {
                                            if (r.canceled) {
                                                selection_HARUPAYSend_import = 0;
                                                return;
                                            };
                                            if(isNaN(r.formValues[0])){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUPAY)§r] §4半角数字で入力してください"}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                selection_HARUPAYSend_import = 0;
                                                return;
                                            }
                                            if (r.formValues[0]>100000000){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUPAY)§r] §4設定した金額は上限をオーバーしています.1億以下で設定してください"}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                selection_HARUPAYSend_import = 0;
                                                return;
                                            }
                                            if (r.formValues[0]<0){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUPAY)§r] §40以下は設定できません"}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                selection_HARUPAYSend_import = 0;
                                                return;
                                            }
                                            var selection_score_harupay = 0;
                                            if(r.formValues[0]=='') {selection_score_harupay=0}else{
                                                selection_score_harupay=r.formValues[0]
                                            }
                                            //残高不足時メッセージ
                                            player.runCommand(`tellraw @a[name="${player.name}", scores={money=..${selection_score_harupay-1}}] {"rawtext":[{"text":"§r[§a通知§7(HARUPAY)§r] §eHARUPAY残高が不足しています"}]}`)
                                            player.runCommand(`playsound random.toast @a[name="${player.name}", scores={money=..${selection_score_harupay-1}}] ~ ~ ~ 1.0 0.4 0.7`)
                                            //残高が設定金額以上の場合のみ実行
                                            if(score >= selection_score_harupay){
                                                player.runCommand(`scoreboard players add @a[name="${partner}"] money ${selection_score_harupay}`)  
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUPAY)§r] §b${partner}へ送信されました"}]}`) 
                                                player.runCommand(`tellraw @a[name="${partner}"] {"rawtext":[{"text":"§r[§a通知§7(HARUPAY)§r] §b${player.name}から${selection_score_harupay}PAY受け取りました"}]}`) 
                                                player.runCommand(`playsound random.toast @a[name="${partner}"] ~ ~ ~ 1.0 1.7 1.0`)  
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 1.0`)  
                                                player.runCommand(`scoreboard players remove @a[name="${player.name}", scores={money=${selection_score_harupay}..}] money ${selection_score_harupay}`)
                                                const timer = new Date();
                                                harupay_logs[harupay_logs.length]=`[${timer.getHours()}:${timer.getMinutes()}]${player.name}が${partner}へ${selection_score_harupay}PAY送信`
                                             }
                                             selection_HARUPAYSend_import = 0;
                                        })
                                    })
                                break;
                                default:
                            }
                        })
                    break;
                    case 3:
                        var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body("ご利用になられるサービスを選択");
                        form.button("§2My情報");
                        form.button("§c街(村)のマイページへ");
                        form.button("§9手続き");
                        form.button("§1代表Controller\n§8こちらで街(村)のコントロールが行えます");
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response = r.selection;
                            switch (response) {
                                case 0:
                                    var HARUAccount_information_stop2 = -1;
                                    const HARUAccount_information = world.getDynamicProperty('HARUAccount_information')
                                    if(HARUAccount_information==undefined){
                                        var HARUAccount_information_system2=[]
                                    }else{
                                    var HARUAccount_information_system2 = JSON.parse(HARUAccount_information);
                                    }
                                    for (let i = 0; i < HARUAccount_information_system2.length; i++){
                                        if(HARUAccount_information_system2[i][2]==player.getDynamicProperty('Mynumber')){
                                            HARUAccount_information_stop2 = i
                                        }
                                    }
                                    var Mynumber = player.getDynamicProperty('Mynumber')
                                    if(Mynumber==undefined){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §4マイナンバーを取得してください"}]}`)
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §c「手続き」§rから§2マイナンバー§rを取得できます"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    if(HARUAccount_information_system2[HARUAccount_information_stop2][1]!=player.name){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §4情報設定されたプレイヤーネームと異なります"}]}`)
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §c情報データと現在の情報が一致しない場合は予期せぬ不具合が発生する可能性があります"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    if(HARUAccount_information_system2[HARUAccount_information_stop2][0]==undefined){
                                        HARUAccount_information_system2[HARUAccount_information_stop2][0]='情報なし';
                                    }
                                    if(Mynumber==undefined){
                                        Mynumber='未取得'
                                    }
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body(`§lMy情報§r\n§a居住地:§b${HARUAccount_information_system2[HARUAccount_information_stop2][0]}\n§cMyナンバー:§b${Mynumber}\n`);
                                    form.button("閉じる");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                                
                                            break;
                                        }
                                    })
                                break;
                                case 1:      
                                var City_information_get_stop = [];
                                const City_information_get = world.getDynamicProperty('City_information')
                                if(City_information_get==undefined){
                                    var City_information_get_system2=[]
                                }else{
                                var City_information_get_system2 = JSON.parse(City_information_get);
                                }
                                if(City_information_get_system2[0]==undefined){
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §4街(村)を取得できませんでした"}]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                    return;
                                }
                                for (let i = 0; i < City_information_get_system2.length; i++){
                                    for (let i1 = 0; i1 < City_information_get_system2[i][4].length; i1++){
                                     if(City_information_get_system2[i][4][i1][1]==player.getDynamicProperty('Mynumber')){
                                        City_information_get_stop.push(i)
                                        City_information_get_stop.push(i1)
                                     }
                                    }
                                }
                                if(City_information_get_stop[0]==undefined){
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §4居住地を取得できませんでした"}]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                    return;
                                }
                                   var form = new ActionFormData();
                                   form.title("HARUPhone1");
                                   form.body(`§c${City_information_get_system2[City_information_get_stop[0]][0]}のマイページ\n§aHARUAccount-Money§r:§b${City_information_get_system2[City_information_get_stop[0]][4][City_information_get_stop[1]][5]}`);
                                   form.button(`通知 §r§b${City_information_get_system2[City_information_get_stop[0]][4][City_information_get_stop[1]][2].length}§r件`);
                                   form.button("HARUAccountマネー受け取り");
                                   form.button("§9税金管理");
                                   form.button("§1評価する");
                                   form.button("§4街(村)を退出");
                                   form.show(player).then(r => {
                                   if (r.canceled) return;
                                   let response = r.selection;
                                   switch (response) {
                                   case 0:  
                                   if(City_information_get_system2[City_information_get_stop[0]][4][City_information_get_stop[1]][2][0]==undefined){
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §a通知はありません"}]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                    return;
                                   }
                                   var form = new ActionFormData();
                                   form.title("HARUPhone1");
                                   form.body(`§l通知§r§b${City_information_get_system2[City_information_get_stop[0]][4][City_information_get_stop[1]][2].length}§r件`)
                                   for (let i = 0; i < City_information_get_system2[City_information_get_stop[0]][4][City_information_get_stop[1]][2].length; i++){
                                    form.button(`§r[${City_information_get_system2[City_information_get_stop[0]][4][City_information_get_stop[1]][2][i][1]}] §l${City_information_get_system2[City_information_get_stop[0]][4][City_information_get_stop[1]][2][i][0]}`);
                                   }
                                   form.show(player).then(r => {
                                    if (r.canceled) return;
                                    let response = r.selection;
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body(`${City_information_get_system2[City_information_get_stop[0]][4][City_information_get_stop[1]][2][response][0]}\n\n[${City_information_get_system2[City_information_get_stop[0]][4][City_information_get_stop[1]][2][response][1]}]\n\n${City_information_get_system2[City_information_get_stop[0]][4][City_information_get_stop[1]][2][response][2]}`)
                                    form.button("§c通知を削除");
                                    form.button("閉じる");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                        case 0: 
                                          City_information_get_system2[City_information_get_stop[0]][4][City_information_get_stop[1]][2].splice( response, 1 );
                                          const City_information_system3 = JSON.stringify(City_information_get_system2);
                                          world.setDynamicProperty('City_information',City_information_system3)     
                                          player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §a通知を削除しました"}]}`)
                                          player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                        break;
                                        }
                                    })
                                   })
                                   break;
                                   }
                                })      
                                break;
                                case 2:
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("ご利用になられるサービスを選択");
                                    form.button("§cマイナンバーの手続き");
                                    form.button("§2転居届の手続き");     
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("マイナンバーは各プレイヤーの本人確認が必要なシステムにて利用されます.");
                                                form.button("§c取得する");
                                                form.button("§1キャンセル");
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    switch (response) {
                                                        case 0:
                                                            const HARUAccount_information = world.getDynamicProperty('HARUAccount_information')
                                                            if(HARUAccount_information==undefined){
                                                                var HARUAccount_information_system2=[]
                                                            }else{
                                                            var HARUAccount_information_system2 = JSON.parse(HARUAccount_information);
                                                            }
                                                            const Mynumber = player.getDynamicProperty('Mynumber')
                                                            if(Mynumber!=undefined){
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §4取得済みの為処理が中止されました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                return;
                                                            }
                                                            let number = '';
                                                            for (let i = 0; i < 16; i++) {
                                                                number += Math.floor(Math.random() * 10); // 0〜9のランダムな数字
                                                            }
                                                            player.setDynamicProperty('Mynumber',number)
                                                            HARUAccount_information_system2.push([undefined,player.name,number])
                                                            const HARUAccount_information_system3 = JSON.stringify(HARUAccount_information_system2);
                                                            world.setDynamicProperty('HARUAccount_information',HARUAccount_information_system3)
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §bマイナンバーを取得しました"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        break;
                                                    }
                                                })
                                            break;
                                            case 1:
                                                const City_information = world.getDynamicProperty('City_information')
                                                if(City_information==undefined){
                                                    var City_information_system2=[]
                                                }else{
                                                var City_information_system2 = JSON.parse(City_information);
                                                }
                                                if(City_information_system2[0]==undefined){
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §4街(村)を取得できませんでした"}]}`)
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                    return;
                                                }
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("転居先を選択");
                                                for (let i = 0; i < City_information_system2.length; i++){
                                                    form.button(`${City_information_system2[i][0]}`);
                                                }
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    switch (response) {
                                                        case 0:
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body(`§2${City_information_system2[response][0]}§rの情報\n§a代表者§r:§b${City_information_system2[response][1]}\n§a一般財源§r:§b${City_information_system2[response][3][0]}\n§c評価§r:§b不明`);
                                                            form.button(`転居先を確定する`);
                                                            form.button(`キャンセル`);
                                                            var City_information_system2_cash1 = response;
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                switch (response) {
                                                                    case 0:
                                                                        var HARUAccount_information_stop = -1;
                                                                        const HARUAccount_information = world.getDynamicProperty('HARUAccount_information')
                                                                        if(HARUAccount_information==undefined){
                                                                            var HARUAccount_information_system2=[]
                                                                        }else{
                                                                        var HARUAccount_information_system2 = JSON.parse(HARUAccount_information);
                                                                        }
                                                                        for (let i = 0; i < HARUAccount_information_system2.length; i++){
                                                                            if(HARUAccount_information_system2[i][2]==player.getDynamicProperty('Mynumber')){
                                                                                HARUAccount_information_stop = i
                                                                            }
                                                                        }
                                                                        if(HARUAccount_information_stop==-1){
                                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §4マイナンバーを取得して下さい"}]}`)
                                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                            return;
                                                                        }
                                                                        if(HARUAccount_information_system2[HARUAccount_information_stop][0]!=undefined){
                                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §4街(村)に所属しています.抜けてから再度お試しください"}]}`)
                                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                            return;
                                                                        }
                                                                        City_information_system2[City_information_system2_cash1][4].push([player.name,player.getDynamicProperty('Mynumber'),[],[],[],0])
                                                                        const City_information_system3 = JSON.stringify(City_information_system2);
                                                                        world.setDynamicProperty('City_information',City_information_system3)     
                                                                        HARUAccount_information_system2[HARUAccount_information_stop][0]=City_information_system2[response][0]
                                                                        const HARUAccount_information_system3 = JSON.stringify(HARUAccount_information_system2);
                                                                        world.setDynamicProperty('HARUAccount_information',HARUAccount_information_system3)     
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §5街(村)に参加しました"}]}`)
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)                                                                  
                                                                    break;
                                                                }
                                                            })
                                                        break;
                                                    }
                                                })
                                            break;
                                        }
                                    })
                                break;
                                case 3:
                                    if(!player.hasTag('City_Representative_Authority_Tag')){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §4権限がありません"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    if(player.getDynamicProperty('Mynumber')==undefined){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §4マイナンバーを取得して下さい"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    var city_information_stop = -1;
                                    const City_information = world.getDynamicProperty('City_information')
                                    if(City_information==undefined){
                                        var City_information_system2=[]
                                    }else{
                                    var City_information_system2 = JSON.parse(City_information);
                                    for (let i = 0; i < City_information_system2.length; i++){
                                        if(City_information_system2[i][2]==player.getDynamicProperty('Mynumber')){
                                            city_information_stop = i
                                        }
                                    }
                                    }
                                    if(city_information_stop==-1){
                                    var city_information_cash = []
                                    var form = new ModalFormData();
                                    form.title("HARUPhone1");
                                    form.textField("街(村)の名前", "例:DiamondCity")
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        if(r.formValues[0]==''){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §4情報未入力です"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        city_information_cash.push(r.formValues[0])
                                        var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body(`以下のプレイヤーが${city_information_cash[0]}の代表に設定されます\n§aゲーマータグ§r:§b${player.name}\n§aマイナンバー§r:§b${player.getDynamicProperty('Mynumber')}`);
                                        form.button("§3確認");
                                        form.button("§1キャンセル");
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            switch (response) {
                                                case 0:
                                                    city_information_cash.push(player.name,player.getDynamicProperty('Mynumber'))
                                                    const City_information = world.getDynamicProperty('City_information')
                                                    if(City_information==undefined){
                                                        var City_information_system2=[]
                                                    }else{
                                                    var City_information_system2 = JSON.parse(City_information);
                                                    }
                                                    City_information_system2.push([city_information_cash[0],city_information_cash[1],city_information_cash[2],[0],[],[]])
                                                    const City_information_system3 = JSON.stringify(City_information_system2);
                                                    world.setDynamicProperty('City_information',City_information_system3)   
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §a街(村)を登録しました"}]}`)
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §5街(村)をコントロールするには再度開きなおしてください"}]}`)
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                break;
                                                case 1:
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §4処理がキャンセルされました"}]}`)
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                break;
                                            }
                                        })
                                    }).catch(e => {
                                        console.error(e, e.stack);
                                    });
                                }else{
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body(`§5代表Controller\n§2${City_information_system2[city_information_stop][0]}\n§a一般財源§r:§b${City_information_system2[city_information_stop][3][0]}`);
                                    form.button("§c住民管理");
                                    form.button("§2一般財源の使用");     
                                    form.button("§1税金管理");  
                                    form.button("§9申請管理");  
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body(`§a管理する項目を選択`);
                                                form.button("§2全住民リスト");
                                                form.button("§c税金未支払いの住民リスト");  
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    switch (response) {
                                                        case 0:
                                                            const City_information = world.getDynamicProperty('City_information')
                                                            if(City_information==undefined){
                                                                var City_information_system2=[]
                                                            }else{
                                                            var City_information_system2 = JSON.parse(City_information);
                                                            }
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body(`§a住民リスト`);
                                                            for (let i = 0; i < City_information_system2[city_information_stop][4].length; i++){ 
                                                                form.button(`${City_information_system2[city_information_stop][4][i][0]}\n§1${City_information_system2[city_information_stop][4][i][1]}`);
                                                            }
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                var form = new ActionFormData();
                                                                form.title("HARUPhone1");
                                                                form.body(`§aゲーマータグ§r:§b${City_information_system2[city_information_stop][4][response][0]}\n§9${City_information_system2[city_information_stop][4][response][1]}\n`);
                                                                form.button(`§2お知らせを送信`);
                                                                form.button(`§4街(村)から追放`);
                                                                form.show(player).then(r => {
                                                                    if (r.canceled) return;
                                                                    let response1 = r.selection;
                                                                    switch (response1) {
                                                                        case 0:
                                                                            var form = new ModalFormData();
                                                                            form.title("HARUPhone1");
                                                                            let levelList = [ "お知らせ", "要確認", "重要", "警告", "最終警告"]
                                                                            form.textField("メッセージタイトル", ``) 
                                                                            form.dropdown("重要度", levelList)
                                                                            form.textField("メッセージ", `具体的な内容`) 
                                                                            form.show(player).then(r => {
                                                                                if (r.canceled) return;
                                                                                City_information_system2[city_information_stop][4][response][2].push([r.formValues[0],levelList[r.formValues[1]],r.formValues[2]])
                                                                                const City_information_system3 = JSON.stringify(City_information_system2);
                                                                                world.setDynamicProperty('City_information',City_information_system3)   
                                                                            })
                                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUAccount)§r] §5送信しました"}]}`)
                                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)   
                                                                        break;
                                                                        case 1:
                                                                            
                                                                        break;
                                                                        
                                                                    }
                                                                })
                                                            })
                                                        break;
                                                    }
                                                })
                                            break;
                                        }
                                        })
                                }
                                break;
                            }
                        })
                    break;
                    case 4:
                        var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body("サービスを選択");
                        form.button(`購入`);
                        form.button(`出品`);
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response = r.selection;
                            switch (response) {
                                case 0:
                                    if(shop_stop_import==1){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Quick)§r] §eただいまサーバーが混みあっております.しばらくしてからもう一度お試しください"}]}`) 
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    };
                                    shop_stop_import=1
                                    if(shop_menu.length==0){
                                        player.runCommand(`tellraw @s{"rawtext":[{"text":"§r[§a通知§7(Quick)§r] §a商品が見つかりませんでした"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        shop_stop_import=0
                                        return;
                                    };
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("商品一覧");
                                    for (let i = 0; i < shop_menu.length; i++){
                                        form.button(`§l${shop_menu[i][0]}\n§r額:§b${shop_menu[i][2]}§rPAY  出品者:§2${shop_menu[i][1]}`);
                                    }
                                    form.show(player).then(r => {
                                        if (r.canceled) {
                                            shop_stop_import=0
                                            return;
                                        };
                                        let response = r.selection;
                                        const score = world.scoreboard.getObjective("money").getScore(player.scoreboardIdentity);
                                        form = new MessageFormData();
                                        form.title("商品内容の詳細");
                                        form.body(`§l${shop_menu[response][0]}\n§r${shop_menu[response][3]}\n§r額:§b${shop_menu[response][2]}§rPAY  出品者:§2${shop_menu[response][1]}\n\n§eこの商品を買うを選択した場合\nHARUPAY残高から支払われます.\n§r現在の残高:§3${score}§r\n購入後の残高:§4${score-shop_menu[response][2]}`);
                                        form.button1("この商品を買う");
                                        form.button2("閉じる");
                                        form.show(player).then(r => {
                                            if (r.canceled) {
                                                shop_stop_import=0
                                                return;
                                            }
                                            if (r.selection === 0) {
                                            const players=world.getAllPlayers();
                                            var flg1 = false
                                            for (let i = 0; i < players.length; i++){
                                                if(shop_menu[response][1]==players[i].name){
                                                  flg1=true
                                                }    
                                            }
                                            if(flg1==true){
                                            //残高不足時メッセージ
                                            player.runCommand(`tellraw @a[name="${player.name}", scores={money=..${shop_menu[response][2]-1}}] {"rawtext":[{"text":"§r[§a通知§7(Quick)§r] §eHARUPAY残高が不足しています"}]}`)
                                            player.runCommand(`playsound random.toast @a[name="${player.name}", scores={money=..${shop_menu[response][2]-1}}] ~ ~ ~ 1.0 0.4 0.7`)
                                            //残高が設定金額以上の場合のみ実行
                                            if(score >= shop_menu[response][2]){
                                                player.runCommand(`scoreboard players add @a[name="${shop_menu[response][1]}"] money ${shop_menu[response][2]}`)  
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Quick)§r] §b${shop_menu[response][1]}へ支払いました"}]}`) 
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 1.0`)
                                                player.runCommand(`playsound random.toast @a[name="${shop_menu[response][1]}"] ~ ~ ~ 1.0 1.7 1.0`)
                                                player.runCommand(`tellraw @a[name="${shop_menu[response][1]}"] {"rawtext":[{"text":"§r[§a通知§7(Quick)§r] §b${player.name}§rが§b${shop_menu[response][0]}§rを§e注文しました"}]}`)  
                                                player.runCommand(`tellraw @a[name="${shop_menu[response][1]}"] {"rawtext":[{"text":"§r[§a通知§7(Quick)§r] §e${player.name}から${shop_menu[response][2]}PAY受け取りました"}]}`)  
                                                player.runCommand(`scoreboard players remove @a[name="${player.name}", scores={money=${shop_menu[response][2]}..}] money ${shop_menu[response][2]}`)
                                                const timer = new Date();
                                                harupay_logs[harupay_logs.length]=`[${timer.getHours()}:${timer.getMinutes()}]${player.name}が${shop_menu[response][1]}へ${shop_menu[response][2]}PAY送信 [quickにて]`
                                                shop_menu.splice( response, 1 );
                                                shop_stop_import=0
                                             }
                                            }else{
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Quick)§r] §4現在販売者がオフラインの為販売を中止します"}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            }
                                                shop_stop_import=0
                                                return;
                                            };
                                            if (r.selection === 1) {
                                                shop_stop_import=0
                                                return;
                                            };
                                        }).catch(e => {
                                            shop_stop_import=0
                                            console.error(e, e.stack);
                                        });
                                        
                                    }).catch(e => {
                                        console.error(e, e.stack);
                                    });
                                break;
                                case 1:
                                    var form = new ModalFormData();
                                    form.title("HARUPhone1");
                                    form.textField("商品名", "丸石")
                                    form.textField("詳細", "エンチャント内容など")
                                    form.textField("販売額(半角数字)", "0") 
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        if(isNaN(r.formValues[2])){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Quick)§r] §4半角数字で入力してください"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        if (r.formValues[2]>100000000){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Quick)§r] §4設定した金額は上限をオーバーしています.1億以下で設定してください"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        if (r.formValues[2]<0){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Quick)§r] §40以下は設定できません"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        var selection_score_quick = 0;
                                            if(r.formValues[2]=='') {selection_score_quick=0}else{
                                                selection_score_quick=r.formValues[2]
                                            }
                                        var shop_cash=[r.formValues[0],player.name,selection_score_quick,r.formValues[1]]
                                        shop_menu[shop_menu.length]=shop_cash;
                                        player.runCommand(`tellraw @a {"rawtext":[{"text":"§r[§a通知§7(Quick)§r] §b${r.formValues[0]}§3の販売が開始されました。"}]}`)
                                        player.runCommand(`playsound random.toast @a ~ ~ ~ 1.0 1.7 0.5`)
                                    }).catch(e => {
                                        console.error(e, e.stack);
                                    });
                                break;
                            }
                        })
                    break;
                    case 5:
                        //メール
                        if(selection_mail_import==1){
                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(メール)§r] §eただいまサーバーが混みあっております.しばらくしてからもう一度お試しください"}]}`) 
                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                            return;
                        }
                            var players = world.getAllPlayers()
                            selection_mail_import = 1;
                        //送信先プレイヤー選択画面
                            var form = new ActionFormData();
                            form.title("HARUPhone1");
                            form.body("送信先プレイヤーを選択");
                            for (let i = 0; i < players.length; i++){
                                form.button(`${players[i].name}`);
                            }
                            form.show(player).then(r => {
                                if (r.canceled){ 
                                    selection_mail_import = 0;
                                    return
                                };
                                let response = r.selection;
                                        //送信先プレイヤーネーム
                                        var partner = players[response].name
                                        form = new ModalFormData()
                                        form.title("HARUPhone1");
                                        form.textField("メッセージ", "メッセージ入力")
                                        form.toggle("トラブルに繋がるテキストは禁止です", false)
                                        form.show(player).then(r => {
                                            if (r.canceled){ 
                                                selection_mail_import = 0;
                                                return
                                            };
                                            if(r.formValues[1]==true){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(メール)§r] §aメッセージを${partner}に送信しました"}]}`);
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                player.runCommand(`playsound random.toast @a[name="${partner}"] ~ ~ ~ 1.0 1.7 0.5`)
                                                player.runCommand(`tellraw @a[name="${partner}"] {"rawtext":[{"text":"§r[§a通知§7(メール)§r] §a§l${player.name}§r§3から受信:§6${r.formValues[0]}"}]}`);
                                                selection_mail_import = 0;
                                            }else{
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(メール)§r] §cルールをチェックしてください"}]}`);
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                selection_mail_import = 0;
                                            }
                                        })
                                        
                            })
                    break;
                    case 6:
                        const score = world.scoreboard.getObjective("account").getScore(player.scoreboardIdentity);
                        var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body(`§b現在の口座残高:§e${score}\n\n§rサービスを選択してください`);
                        form.button("§b預け入れ");
                        form.button("§a引き出し");
                        form.show(player).then(r => {
                            if (r.canceled){
                                return;
                            }
                            if(r.selection===0){
                                form = new ModalFormData();
                                form.textField("預け入れ金額(半角数字)", "0")
                                form.show(player).then(r => {
                                    if (r.canceled) {
                                        return;
                                    };
                                    if(isNaN(r.formValues[0])){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(ATM)§r] §4半角数字で入力してください"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    if (r.formValues[0]>100000000){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(ATM)§r] §4設定した金額は上限をオーバーしています.1億以下で設定してください"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    if (r.formValues[0]<0){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(ATM)§r] §40以下は設定できません"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    var selection_score_atm = 0;
                                    if(r.formValues[0]=='') {selection_score_atm=0}else{
                                        selection_score_atm = r.formValues[0]
                                    }
                                    player.runCommand(`scoreboard players add @s[scores={money=${selection_score_atm}..}] account ${selection_score_atm}`)
                                    player.runCommand(`tellraw @s[scores={money=${selection_score_atm}..}] {"rawtext":[{"text":"§r[§a通知§7(ATM)§r] §3${selection_score_atm}預け入れました"}]}`)
                                    player.runCommand(`tellraw @s[scores={money=..${selection_score_atm-1}}] {"rawtext":[{"text":"§r[§a通知§7(ATM)§r] §4moneyが不足しています"}]}`)
                                    player.runCommand(`playsound random.toast @s[scores={money=..${selection_score_atm-1}}] ~ ~ ~ 1.0 0.4 0.7`)
                                    player.runCommand(`playsound random.toast @s[scores={money=${selection_score_atm}..}] ~ ~ ~ 1.0 1.7 0.5`)
                                    player.runCommand(`scoreboard players remove @s[scores={money=${selection_score_atm}..}] money ${selection_score_atm}`)
                                }
                            )  
                            }
                            if(r.selection===1){
                                form = new ModalFormData();
                                form.textField("引き出す金額(半角数字)", "0")
                                form.show(player).then(r => {
                                    if (r.canceled) {
                                        return;
                                    };
                                    if(isNaN(r.formValues[0])){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(ATM)§r] §4半角数字で入力してください"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    if (r.formValues[0]>100000000){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(ATM)§r] §4設定した金額は上限をオーバーしています.1億以下で設定してください"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    if (r.formValues[0]<0){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(ATM)§r] §40以下は設定できません"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    var selection_score_atm = 0;
                                    if(r.formValues[0]=='') {selection_score_atm=0}else{
                                        selection_score_atm = r.formValues[0]
                                    }
                                    player.runCommand(`scoreboard players add @s[scores={account=${selection_score_atm}..}] money ${selection_score_atm}`)
                                    player.runCommand(`tellraw @s[scores={account=${selection_score_atm}..}] {"rawtext":[{"text":"§r[§a通知§7(ATM)§r] §3${selection_score_atm}引き出しました"}]}`)
                                    player.runCommand(`tellraw @s[scores={account=..${selection_score_atm-1}}] {"rawtext":[{"text":"§r[§a通知§7(ATM)§r] §4moneyが不足しています"}]}`)
                                    player.runCommand(`playsound random.toast @s[scores={account=..${selection_score_atm-1}}] ~ ~ ~ 1.0 0.4 0.7`)
                                    player.runCommand(`playsound random.toast @s[scores={account=${selection_score_atm}..}] ~ ~ ~ 1.0 1.7 0.5`)
                                    player.runCommand(`scoreboard players remove @s[scores={account=${selection_score_atm}..}] account ${selection_score_atm}`)
                                }
                            )  
                            }
                        }).catch(e => {
                            console.error(e, e.stack);
                        });
                    break;
                    case 7:
                        //仕事依頼設定画面
                        form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body("サービスを選択");
                        form.button("仕事募集を開始");
                        form.button("仕事を探す");
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response = r.selection;
                            switch (response) {
                                case 0:
                                    var form = new ModalFormData();
                                    form.title("HARUPhone1");
                                    form.textField("仕事ジャンル", "例:整地")
                                    form.textField("仕事内容", "例:約半径30ブロックの整地")
                                    form.textField("報酬額(半角数字)", "0") 
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        if (r.formValues[2]>100000000){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(仕事依頼)§r] §4設定した金額は上限をオーバーしています.1億以下で設定してください"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        if ((r.formValues[1]==''||r.formValues[2]=='')){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(仕事依頼)§r] §4設定されていない項目があるため開始できませんでした"}]}`) 
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        if (r.formValues[2]<0){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(仕事依頼)§r] §40以下は設定できません"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        player.runCommand(`tellraw @a {"rawtext":[{"text":"§a${player.name}§bから仕事募集が開始されました"}]}`) 
                                        player.runCommand(`tellraw @a {"rawtext":[{"text":"§a仕事内容:§f${r.formValues[1]}"}]}`) 
                                        player.runCommand(`tellraw @a {"rawtext":[{"text":"§a報酬額:§b${r.formValues[2]}"}]}`) 
                                        player.runCommand(`playsound random.toast @a ~ ~ ~ 1.0 1.7 0.5`)
                                        quest[quest.length] = [`${r.formValues[0]}`,`${r.formValues[1]}`,`${r.formValues[2]}`,player.name]
                                    }).catch(e => {
                                        console.error(e, e.stack);
                                    });
                                break;
                                case 1:
                                    if(quest[0]!=undefined){
                                        //サーバー混雑時の不具合防止
                                    if(selection_quest_import==1){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(仕事依頼)§r] §eただいまサーバーが混みあっております.しばらくしてからもう一度お試しください"}]}`) 
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                        selection_quest_import = 1;
                                        //仕事依頼を探す画面
                                        var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("仕事を探す");
                                        for (let i = 0; i < quest.length; i++){
                                         form.button(`${quest[i][3]}の募集:${quest[i][0]}`)   
                                        }
                                        form.show(player).then(r => {
                                            let response = r.selection;
                                            if (r.canceled) {
                                                selection_quest_import = 0
                                                return;
                                            }
                                                    //仕事内容を確認する画面
                                                    form = new MessageFormData();
                                                    form.title("仕事内容の詳細");
                                                    form.body(`${quest[response][1]}\n報酬額:${quest[response][2]}\nさらに詳細はを知りたい方は:§a${quest[response][3]}§rにご連絡お願いします\n§4仕事を受けても自動的に報酬を受け取ることはありません`);
                                                    form.button1("この仕事を受ける");
                                                    form.button2("閉じる");
                                                    form.show(player).then(r => {
                                                        if (r.canceled) {
                                                            selection_quest_import = 0;
                                                            return;
                                                        }
                                                        if (r.selection === 0) {
                                                            player.runCommand(`tellraw @a[name="${quest[response][3]}"] {"rawtext":[{"text":"§r[§a通知§7(仕事依頼)§r] §e${player.name}§bがあなたの仕事募集を受けました"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                            player.runCommand(`playsound random.toast @a[name="${quest[response][3]}"] ~ ~ ~ 1.0 1.7 0.5`)
                                                            player.runCommand(`tellraw @a {"rawtext":[{"text":"§r[§a通知§7(仕事依頼)§r] §a${player.name}§bが§a${quest[response][3]}§bの募集を受けた為.募集リストから削除しました"}]}`)
                                                            quest.splice(response, 1);
                                                            selection_quest_import = 0
                                                            return;
                                                        };
                                                        if (r.selection === 1) {
                                                            selection_quest_import = 0
                                                            return;
                                                        };
                                                    }).catch(e => {
                                                        console.error(e, e.stack);
                                                    });
    
                                            }
                                        ).catch(e => {
                                            console.error(e, e.stack);
                                        });
                                    }else{
                                        //仕事が見つからなかった時に出力
                                        player.runCommand(`tellraw @s{"rawtext":[{"text":"§r[§a通知§7(仕事依頼)§r] §a仕事募集が見つかりませんでした"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                    }
                                break;
                                default:
                            }
                        })
                    break; 
                    case 8:
                        if(selection_kannkin_import==1){
                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §eただいまサーバーが混みあっております.しばらくしてからもう一度お試しください"}]}`) 
                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                            return;
                        }
                        selection_kannkin_import=1
                        if (r.canceled) return;
                                    var kannkin_information = world.getDynamicProperty('kannkin_information')
                                    if(kannkin_information==undefined){
                                        var kannkin_information_system2=[]
                                    }else{
                                    var kannkin_information_system2 = JSON.parse(kannkin_information);
                                    }
                                    if(kannkin_information_system2[0]==undefined){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a換金できるアイテムがありません"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        selection_kannkin_import=0
                                        return;
                                    }
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("換金するアイテムを選択");
                                    for (let i = 0; i < kannkin_information_system2.length; i++){
                                        form.button(`${kannkin_information_system2[i][0]} 1個/§b${kannkin_information_system2[i][1]}§r`,`textures/${kannkin_information_system2[i][3]}`);
                                    }
                                    form.show(player).then(r => {
                                        if (r.canceled) {
                                            selection_kannkin_import=0    
                                            return;
                                        }
                                        let response = r.selection;
                                        var form = new ModalFormData();
                                        form.textField("換金数(半角数字)", "0") 
                                        form.show(player).then(r => {
                                            if (r.canceled) {
                                                selection_kannkin_import=0    
                                                return;
                                            }
                                            if (r.formValues[0]<0){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §40以下は設定できません"}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                selection_kannkin_import=0 
                                                return;
                                            }
                                            player.runCommand(`tellraw @s[hasitem={item=${kannkin_information_system2[response][2]},quantity=..${r.formValues[0]-1}}]{"rawtext":[{"text":"§r[§a通知§7(換金)§r] §4アイテム数が足りません"}]}`)
                                            player.runCommand(`playsound random.toast @s[hasitem={item=${kannkin_information_system2[response][2]},quantity=..${r.formValues[0]-1}}] ~ ~ ~ 1.0 0.4 0.7`)
                                            player.runCommand(`tellraw @s[hasitem={item=${kannkin_information_system2[response][2]},quantity=${r.formValues[0]}..}]{"rawtext":[{"text":"§r[§a通知§7(換金)§r] §e換金し${kannkin_information_system2[response][1]*r.formValues[0]}PAY取得しました"}]}`)
                                            player.runCommand(`playsound random.toast @s[hasitem={item=${kannkin_information_system2[response][2]},quantity=${r.formValues[0]}..}] ~ ~ ~ 1.0 1.7 0.5`)
                                            player.runCommand(`scoreboard players add @s[hasitem={item=${kannkin_information_system2[response][2]},quantity=${r.formValues[0]}..}] money ${kannkin_information_system2[response][1]*r.formValues[0]}`)
                                            player.runCommand(`tag @s[hasitem={item=${kannkin_information_system2[response][2]},quantity=${r.formValues[0]}..}] add kannkin_log_tag`)
                                            var kannkin_log = world.getDynamicProperty('kannkin_log')
                                            if(kannkin_log==undefined){
                                                var kannkin_log_system2=[]
                                            }else{
                                            var kannkin_log_system2 = JSON.parse(kannkin_log);
                                            }
                                            if(player.hasTag('kannkin_log_tag')){
                                            kannkin_log_system2[response]=kannkin_log_system2[response]+Number(r.formValues[0])
                                            player.runCommand(`tag @s remove kannkin_log_tag`)
                                            const kannkin_log_system3 = JSON.stringify(kannkin_log_system2);
                                            world.setDynamicProperty('kannkin_log',kannkin_log_system3)
                                            }
                                            player.runCommand(`clear @s[hasitem={item=${kannkin_information_system2[response][2]},quantity=${r.formValues[0]}..}] ${kannkin_information_system2[response][2]} 0 ${r.formValues[0]}`)
                                            selection_kannkin_import=0
                                        }).catch(e => {
                                            selection_kannkin_import=0  
                                            player.runCommand(`tag @s remove kannkin_log_tag`)
                                            console.error(e, e.stack);
                                        });
                                    }).catch(e => {
                                        selection_kannkin_import=0  
                                        player.runCommand(`tag @s remove kannkin_log_tag`)
                                        console.error(e, e.stack);
                                    });       
                    break;
                    case 9: 
                        const kounyuu_list = world.getDynamicProperty('kounyuu_list')
                        if(kounyuu_list==undefined){
                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a購入できるアイテムがありません"}]}`)
                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                            return;
                        }else{
                            var kounyuu_list_system1 = JSON.parse(kounyuu_list);
                        }
                        if(kounyuu_list_system1[0]==undefined){
                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a購入できるアイテムがありません"}]}`)
                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                            return;
                        }
                        //購入
                        var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body("購入するアイテムを選択");
                        for (let i = 0; i < kounyuu_list_system1.length; i++){
                        form.button(`${kounyuu_list_system1[i][0]} 1個/§b${kounyuu_list_system1[i][1]}§r`,`textures/${kounyuu_list_system1[i][3]}`);
                        }
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response = r.selection;
                            var form = new ModalFormData();
                            form.textField("購入数(半角数字)", "0") 
                            form.show(player).then(r => {
                                if (r.canceled) return;
                                if (r.formValues[0]<0){
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §40以下は設定できません"}]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                    return;
                                }
                                if (r.formValues[0]==''){
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §4購入数を設定してください"}]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                    return;
                                }
                                const score = world.scoreboard.getObjective("money").getScore(player.scoreboardIdentity);
                                if(score>=kounyuu_list_system1[response][1]*r.formValues[0]){
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §e${r.formValues[0]}個 購入しました"}]}`)
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §e${kounyuu_list_system1[response][1]*r.formValues[0]}PAY支払いました"}]}`)
                                    player.runCommand(`give @s ${kounyuu_list_system1[response][2]} ${r.formValues[0]}`)
                                    player.runCommand(`scoreboard players remove @s money ${kounyuu_list_system1[response][1]*r.formValues[0]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                    var kounyuu_log = world.getDynamicProperty('kounyuu_log')
                                    if(kounyuu_log==undefined){
                                        var kounyuu_log_system2=[]
                                    }else{
                                    var kounyuu_log_system2 = JSON.parse(kounyuu_log);
                                    }
                                    kounyuu_log_system2[response]=kounyuu_log_system2[response]+Number(r.formValues[0])
                                    const kounyuu_log_system3 = JSON.stringify(kounyuu_log_system2);
                                    world.setDynamicProperty('kounyuu_log',kounyuu_log_system3)                    
                                }else{
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §4Moneyが足りません"}]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                }
                            })
                        })
                    break;
                    case 10: 
                    var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body("情報サービスを選択");
                        form.button("§lHARUPhoneニュース");
                        form.button("§lQuick相場情報");
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response = r.selection;
                            switch (response) {
                                case 0:
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body(`§bHARUPhoneニュース\n§e-------------\n§r§l現在アプデ情報\n§r§eVersion 1.80.0 §r\n§r・§aオリジナルページ共有する機能の追加\n§r・§a購入機能追加\n§r§eVersion 1.81.0\n§r・§a換金システムに指定したアイテムを追加できる機能を追加しました\n\n§r§l§e開発者情報\n§r§l本アドオンをご利用くださいましてありがとうございます。§r\n開発者のHARUGAMEsです。\n今後も引き続きアップデート,修正していきます。\nリクエストなども受け付けております。\n詳しくは本アドオンDiscordサーバーにてご確認ください。`);
                                    form.button("閉じる");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                            break;
                                        }
                                    })
                                break;
                                case 1:
                                    var quick_information_system3 = []
                                    const quick_information = world.getDynamicProperty('quick_information')
                                    if(quick_information==undefined){
                                        var quick_information_system1=[]
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(情報)§r] §a情報が見つかりません"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }else{
                                        var quick_information_system1 = JSON.parse(quick_information);
                                    }
                                    for (let i = 0; i < quick_information_system1.length; i++){
                                        quick_information_system3=quick_information_system3+`§b${quick_information_system1[i][0]}§r:§e${quick_information_system1[i][1]}PAY\n`
                                    }
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body(`§dQuick相場表\n§e-------------\n${quick_information_system3}`);
                                    form.button("閉じる");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                            break;
                                        }
                                    })
                                break;
                            }
                        })
                    break; 
                    case 11:
                        var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body("サービスを選択");
                        form.button("§lページ検索");
                        form.button("§lおすすめページ一覧");
                        form.button("§lページ作成/編集/広告");
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response = r.selection;
                            switch (response) {
                                case 0:
                                    var browser = world.getDynamicProperty('browser')
                                    if(browser==undefined){
                                        var browser_system2=[]
                                    }else{
                                    var browser_system2 = JSON.parse(browser);
                                    }
                                    var form = new ModalFormData();
                                    form.title("HARUPhone1");
                                    form.textField("キーワードを入力", "キーワード検索")
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("検索結果");
                                        var browser_cashdata1=[];
                                        for (let i = 0; i < browser_system2.length; i++){
                                            var domain_keyword_system1 = browser_system2[i][2].indexOf(`${r.formValues[0]}`);
                                            if(domain_keyword_system1 !== -1) {
                                                form.button(`§l${browser_system2[i][2]}\n投稿者:§r§5${browser_system2[i][0]}`);
                                                browser_cashdata1[browser_cashdata1.length]=i
                                            }
                                        }
                                        if(browser_cashdata1[0]==undefined){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §aページが見つかりませんでした"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            browser_system2[browser_cashdata1[response]][1]=browser_system2[browser_cashdata1[response]][1]+1
                                            const browsersystem1 = JSON.stringify(browser_system2);
                                            world.setDynamicProperty('browser',browsersystem1)
                                            var form = new ActionFormData();
                                            form.title("HARUPhone1");
                                            form.body(`§l${browser_system2[browser_cashdata1[response]][3]}\n§e------------\n§r投稿者:§a${browser_system2[browser_cashdata1[response]][0]}\n§e§l------------\n§r${browser_system2[browser_cashdata1[response]][4]}\n\n${browser_system2[browser_cashdata1[response]][5]}\n\n${browser_system2[browser_cashdata1[response]][6]}\n\n${browser_system2[browser_cashdata1[response]][7]}`);
                                            form.button(`閉じる`);
                                            form.show(player).then(r => {
                                                if (r.canceled) return;
                                            })
                                        })
                                    })
                                break;
                                case 1:
                                    var browser = world.getDynamicProperty('browser')
                                    if(browser==undefined){
                                        var browser_system2=[]
                                    }else{
                                    var browser_system2 = JSON.parse(browser);
                                    }
                                    if(browser_system2[0]==undefined){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §aページが見つかりませんでした"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    browser_system2.sort((a, b) => (a[1] > b[1] ? -1 : 1))
                                    var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("おすすめページ");
                                        for (let i = 0; i < browser_system2.length; i++){
                                                if(i<=7){
                                                form.button(`§l${browser_system2[i][2]}\n§r投稿者:§5${browser_system2[i][0]}`);
                                                }
                                        }
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            var form = new ActionFormData();
                                            form.title("HARUPhone1");
                                            form.body(`§l${browser_system2[response][3]}\n§e------------\n§r投稿者:§a${browser_system2[response][0]}\n§e§l------------\n§r${browser_system2[response][4]}\n\n${browser_system2[response][5]}\n\n${browser_system2[response][6]}\n\n${browser_system2[response][7]}`);
                                            form.button(`閉じる`);
                                            form.show(player).then(r => {
                                                if (r.canceled) return;
                                            })
                                        })
                                break;
                                case 2:
                                    var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("機能を選択");
                                        form.button(`§l新規作成 \n§rページ投稿費用:§b${world.getDynamicProperty('browser_newpage_money')}§rPAY`);
                                        form.button("§l既存のページ編集");
                                        form.button("§lページの削除");
                                        form.button(`§l広告\n§r§8こちらで作成したページを広告化できます`);
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            switch (response) {
                                                case 0:
                                                    if(world.getDynamicProperty('browser_newpage_money')==undefined){
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r §4管理者が初期設定を完了していない為新規作成出来ません"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                        return;
                                                    }
                                                    var form = new ModalFormData();
                                                    form.textField("検索表示タイトル", "ここは検索されやすいワード推奨") 
                                                    form.textField("ページタイトル", "ここは太字になります")
                                                    form.textField("文章1", "タイトルの下に追加されます")
                                                    form.textField("文章2", "文章1の下に追加されます")
                                                    form.textField("文章3", "文章2の下に追加されます")
                                                    form.textField("文章4", "文章3の下に追加されます")
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        const score = world.scoreboard.getObjective("money").getScore(player.scoreboardIdentity);
                                                        if(score>=world.getDynamicProperty('browser_newpage_money')){
                                                        var browser = world.getDynamicProperty('browser')
                                                        if(browser==undefined){
                                                            var browser_system2=[]
                                                        }else{
                                                        var browser_system2 = JSON.parse(browser);
                                                        }
                                                        browser_system2.push([player.name,0,r.formValues[0],r.formValues[1],r.formValues[2],r.formValues[3],r.formValues[4],r.formValues[5]])
                                                        const browser_system3 = JSON.stringify(browser_system2);
                                                        world.setDynamicProperty('browser',browser_system3)
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r §e${world.getDynamicProperty('browser_newpage_money')}PAY支払いました"}]}`)
                                                            var harupay_op_money = 0
                                                            if(world.getDynamicProperty('harupay_op_money')!=undefined){
                                                                harupay_op_money=world.getDynamicProperty('harupay_op_money')
                                                            }
                                                            world.setDynamicProperty('harupay_op_money',Number(harupay_op_money)+Number(world.getDynamicProperty('browser_newpage_money')))
                                                            player.runCommand(`scoreboard players remove @s money ${world.getDynamicProperty('browser_newpage_money')}`)
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a新規作成しました"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        }else{
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §4Moneyが足りません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                        }
                                                    })
                                                break;
                                                case 1:
                                                    var browser = world.getDynamicProperty('browser')
                                                        if(browser==undefined){
                                                            var browser_system2=[]
                                                        }else{
                                                        var browser_system2 = JSON.parse(browser);
                                                        }
                                                        var browser_cash = [];
                                                        for (let i = 0; i < browser_system2.length; i++){
                                                            if(browser_system2[i][0]==player.name){
                                                                browser_cash.push([[i],browser_system2[i]])
                                                            }
                                                        }
                                                        if(browser_cash[0]==undefined){
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a編集できるページがありません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            return;
                                                        }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("編集するページを選択");
                                                    for (let i = 0; i < browser_cash.length; i++){
                                                        form.button(`§l${browser_cash[i][1][2]}\n§r${browser_cash[i][1][3]}`);
                                                    }
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        var form = new ModalFormData();
                                                        form.textField("検索表示タイトル", `${browser_cash[response][1][2]}`) 
                                                        form.textField("ページタイトル", `${browser_cash[response][1][3]}`)
                                                        form.textField("文章1", `${browser_cash[response][1][4]}`)
                                                        form.textField("文章2", `${browser_cash[response][1][5]}`)
                                                        form.textField("文章3", `${browser_cash[response][1][6]}`)
                                                        form.textField("文章4", `${browser_cash[response][1][7]}`)
                                                        form.show(player).then(r => {
                                                            if (r.canceled) return;
                                                            if(r.formValues[0]!=''){browser_cash[response][1][2]=r.formValues[0]}
                                                            if(r.formValues[1]!=''){browser_cash[response][1][3]=r.formValues[1]}
                                                            if(r.formValues[2]!=''){browser_cash[response][1][4]=r.formValues[2]}
                                                            if(r.formValues[3]!=''){browser_cash[response][1][5]=r.formValues[3]}
                                                            if(r.formValues[4]!=''){browser_cash[response][1][6]=r.formValues[4]}
                                                            if(r.formValues[5]!=''){browser_cash[response][1][7]=r.formValues[5]}
                                                            browser_system2[browser_cash[response][0][0]]=browser_cash[response][1]
                                                            const browser_system3 = JSON.stringify(browser_system2);
                                                            world.setDynamicProperty('browser',browser_system3)
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §aページを編集しました"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        })
                                                    })
                                                break;
                                                case 2:
                                                    var browser = world.getDynamicProperty('browser')
                                                        if(browser==undefined){
                                                            var browser_system2=[]
                                                        }else{
                                                        var browser_system2 = JSON.parse(browser);
                                                        }
                                                        var browser_cash = [];
                                                        for (let i = 0; i < browser_system2.length; i++){
                                                            if(browser_system2[i][0]==player.name){
                                                                browser_cash.push([[i],browser_system2[i]])
                                                            }
                                                        }
                                                        if(browser_cash[0]==undefined){
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a削除できるページがありません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            return;
                                                        }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("削除するページを選択");
                                                    for (let i = 0; i < browser_cash.length; i++){
                                                        form.button(`§l${browser_cash[i][1][2]}\n§r${browser_cash[i][1][3]}`);
                                                    }
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        browser_system2.splice( browser_cash[response][0][0] , 1 );
                                                        const browser_system3 = JSON.stringify(browser_system2);
                                                        world.setDynamicProperty('browser',browser_system3)
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §aページを削除しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                    })
                                                break;
                                                case 3:
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("サービスを選択");
                                                    form.button(`§l広告化 \n§rページ広告化費用:§b${world.getDynamicProperty('browser_performance_money')}§rPAY`);
                                                    form.button("§l広告削除");
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        switch (response) {
                                                            case 0:
                                                                if(world.getDynamicProperty('browser_performance_money')==undefined){
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §4管理者が初期設定を完了していない為新規作成出来ません"}]}`)
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                    return;
                                                                }
                                                                var browser = world.getDynamicProperty('browser')
                                                                    if(browser==undefined){
                                                                        var browser_system2=[]
                                                                    }else{
                                                                    var browser_system2 = JSON.parse(browser);
                                                                    }
                                                                    var browser_cash = [];
                                                                    for (let i = 0; i < browser_system2.length; i++){
                                                                        if(browser_system2[i][0]==player.name){
                                                                            browser_cash.push([[i],browser_system2[i]])
                                                                        }
                                                                    }
                                                                    if(browser_cash[0]==undefined){
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a広告化できるページがありません"}]}`)
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                        return;
                                                                    }
                                                                var form = new ActionFormData();
                                                                form.title("HARUPhone1");
                                                                form.body("広告化するページを選択");
                                                                for (let i = 0; i < browser_cash.length; i++){
                                                                    form.button(`§l${browser_cash[i][1][2]}\n§r${browser_cash[i][1][3]}`);
                                                                }
                                                                form.show(player).then(r => {
                                                                    if (r.canceled) return;
                                                                    let response = r.selection;
                                                                    const score = world.scoreboard.getObjective("money").getScore(player.scoreboardIdentity);
                                                                    if(score>=world.getDynamicProperty('browser_performance_money')){
                                                                    var performance = world.getDynamicProperty('performance')
                                                                    if(performance==undefined){
                                                                        var performance_system2=[]
                                                                    }else{
                                                                    var performance_system2 = JSON.parse(performance);
                                                                    }   
                                                                    var performance_cash_system2 = 0;
                                                                    for (let i = 0; i < performance_system2.length; i++){
                                                                        if(performance_system2[i][2]==browser_cash[response][1][2]&&performance_system2[i][0]==browser_cash[response][1][0]&&performance_system2[i][3]==browser_cash[response][1][3]&&performance_system2[i][4]==browser_cash[response][1][4]&&performance_system2[i][5]==browser_cash[response][1][5]){
                                                                            performance_cash_system2 = 1
                                                                        }
                                                                    }
                                                                        if(performance_cash_system2 == 1){
                                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §4選択したページは既に広告化済みです"}]}`)
                                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                            return;
                                                                        }
                                                                        performance_system2.push(browser_cash[response][1])
                                                                        const performance_system3 = JSON.stringify(performance_system2);
                                                                        world.setDynamicProperty('performance',performance_system3)
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §e${world.getDynamicProperty('browser_performance_money')}PAY支払いました"}]}`)
                                                                        var harupay_op_money = 0
                                                                        if(world.getDynamicProperty('harupay_op_money')!=undefined){
                                                                            harupay_op_money=world.getDynamicProperty('harupay_op_money')
                                                                        }
                                                                        world.setDynamicProperty('harupay_op_money',Number(harupay_op_money)+Number(world.getDynamicProperty('browser_performance_money')))
                                                                        player.runCommand(`scoreboard players remove @s money ${world.getDynamicProperty('browser_performance_money')}`)
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §aページを広告化しました"}]}`)
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                }else{
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §4Moneyが足りません"}]}`)
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                }
                                                            })
                                                           break;
                                                           case 1:
                                                            var browser = world.getDynamicProperty('performance')
                                                            if(browser==undefined){
                                                                var browser_system2=[]
                                                            }else{
                                                            var browser_system2 = JSON.parse(browser);
                                                            }
                                                            var browser_cash = [];
                                                            for (let i = 0; i < browser_system2.length; i++){
                                                                if(browser_system2[i][0]==player.name){
                                                                    browser_cash.push([[i],browser_system2[i]])
                                                                }
                                                            }
                                                            if(browser_cash[0]==undefined){
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a削除できる広告がありません"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                return;
                                                            }
                                                        var form = new ActionFormData();
                                                        form.title("HARUPhone1");
                                                        form.body("削除する広告を選択");
                                                        for (let i = 0; i < browser_cash.length; i++){
                                                            form.button(`§l${browser_cash[i][1][2]}\n§r${browser_cash[i][1][3]}`);
                                                        }
                                                        form.show(player).then(r => {
                                                            if (r.canceled) return;
                                                            let response = r.selection;
                                                            browser_system2.splice( browser_cash[response][0][0] , 1 );
                                                            const browser_system3 = JSON.stringify(browser_system2);
                                                            world.setDynamicProperty('performance',browser_system3)
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a広告を削除しました"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        })
                                                           break;
                                                        }
                                                    })
                                                    
                                                    
                                                break;
                                            }
                                        })
                                        
                                break;
                            }
                        })
                    break;
                    case 12:
                    var form = new ActionFormData();
                    form.title("HARUPhone1");
                    form.body(`商品を見つける`);
                    form.button(`§9キーワード検索`);
                    form.button(`§2会社指定`);
                    form.button(`§1注文した商品の配送状況`);
                    form.show(player).then(r => {
                        if (r.canceled) return;
                        let response = r.selection;
                        switch (response) {
                            case 0:
                                var advance_shop = world.getDynamicProperty('advance_shop')
                                    if(advance_shop==undefined){
                                        var advance_shop_system2=[]
                                    }else{
                                    var advance_shop_system2 = JSON.parse(advance_shop);
                                    }
                                    var advance_shop_cash = [[],[]]
                                    var advance_shop_cash1 = 0
                                    var advance_shop_cash2 = []
                                    var advance_shop_cash3 = []
                                    if(advance_shop==undefined||advance_shop_system2[0]==undefined){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §a商品が見つかりませんでした"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    var form = new ModalFormData();
                                    form.title("HARUPhone1");
                                    form.textField("検索商品", "ダイアモンド") 
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        if(r.formValues[0]==''){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §4検索キーワードを入力してください"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        var form = new ActionFormData();
                                        form.title("advance");
                                        form.body("検索商品リスト");
                                        for (let i = 0; i < advance_shop_system2.length; i++){
                                            advance_shop_cash[0].push(i)
                                            for (let i1 = 0; i1 < advance_shop_system2[i][1].length; i1++){
                                                if(advance_shop_system2[i][1][i1][0].indexOf(r.formValues[0])!=-1){
                                                    form.button(`§l${advance_shop_system2[i][1][i1][0]}\n§r金額:§9${advance_shop_system2[i][1][i1][1]} §r在庫:§2${advance_shop_system2[i][1][i1][2]}`);
                                                    advance_shop_cash1 = 1
                                                    advance_shop_cash2.push(i)
                                                    advance_shop_cash3.push(i1)
                                                }   
                                            }
                                        }
                                        if(advance_shop_cash1==0){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §a商品が見つかりませんでした"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                                advance_shop_cash[1].push(advance_shop_cash2[response])
                                                advance_shop_cash[1].push(response)
                                                advance_shop_cash[1].push(advance_shop_cash3[response])
                                                var form = new ModalFormData();
                                                form.title("HARUPhone1");
                                                form.textField("個数 (半角数字)", "0") 
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    advance_shop_cash[1].push(Number(r.formValues[0]))
                                                    if(r.formValues[0]<=0){
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §40以下は設定できません"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                        return;
                                                    }
                                                    if(r.formValues[0]==''){
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §4個数を入力してください"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                        return;
                                                    }
                                                    if(Number(r.formValues[0])>advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][2]][2]){
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §4在庫数をオーバーしています"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                        return;
                                                    }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body(`§l注文内容\n\n§r商品名:§a${advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][2]][0]}\n§r個数:§a${advance_shop_cash[1][3]}§r合計金額:§b${advance_shop_cash[1][3]*advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][2]][1]}\n\n§r販売元:§a${advance_shop_system2[advance_shop_cash[1][0]][0]}`);
                                                    form.button(`注文`)
                                                    form.button(`閉じる`)
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        switch (response) {
                                                            case 0:
                                                                const score = world.scoreboard.getObjective("money").getScore(player.scoreboardIdentity);
                                                                if(score>=advance_shop_cash[1][3]*advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][2]][1]){
                                                                advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][2]][2]=advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][2]][2]-advance_shop_cash[1][2]
                                                                advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][2]][3].push([player.name,advance_shop_cash[1][3],0])
                                                                advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][2]][4]=advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][2]][4]+1
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §a注文しました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                var advance_member = world.getDynamicProperty('advance_member')
                                                                var advance_member_system2 = JSON.parse(advance_member);
                                                                for (let i = 0; i < advance_member_system2.length; i++){
                                                                    if(advance_member_system2[i][1]==advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][0]){
                                                                        advance_member_system2[i][3]=advance_member_system2[i][3]+advance_shop_cash[1][3]*advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][2]][1]
                                                                    }
                                                                }
                                                                const advance_shop_system3 = JSON.stringify(advance_shop_system2);
                                                                world.setDynamicProperty('advance_shop',advance_shop_system3)
                                                                const advance_member_system3 = JSON.stringify(advance_member_system2);
                                                                world.setDynamicProperty('advance_member',advance_member_system3)
                                                                player.runCommand(`scoreboard players remove @s money ${advance_shop_cash[1][3]*advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][2]][1]}`)
                                                            }else{
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §4所持金が不足しています"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            }
                                                            break;
                                                        }
                                                    })
                                                })
                                        })
                                    })
                            break;
                            case 1:
                                var advance_shop = world.getDynamicProperty('advance_shop')
                                    if(advance_shop==undefined){
                                        var advance_shop_system2=[]
                                    }else{
                                    var advance_shop_system2 = JSON.parse(advance_shop);
                                    }
                                    var advance_shop_cash = [[],[]]
                                    if(advance_shop==undefined||advance_shop_system2[0]==undefined){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §a商品が見つかりませんでした"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                               var form = new ActionFormData();
                                form.title("HARUPhone1");
                                form.body("会社を指定して商品を探します");
                                for (let i = 0; i < advance_shop_system2.length; i++){
                                    form.button(`${advance_shop_system2[i][0]}§r`);
                                    advance_shop_cash[0].push(i)
                                }
                                form.show(player).then(r => {
                                    if (r.canceled) return;
                                    let response = r.selection;
                                    advance_shop_cash[1].push(response)
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body(`${advance_shop_system2[advance_shop_cash[0][response]][0]}の商品一覧`);
                                    for (let i = 0; i < advance_shop_system2[advance_shop_cash[0][response]][1].length; i++){
                                        form.button(`§l${advance_shop_system2[advance_shop_cash[0][response]][1][i][0]}\n§r金額:§9${advance_shop_system2[advance_shop_cash[0][response]][1][i][1]} §r在庫:§2${advance_shop_system2[advance_shop_cash[0][response]][1][i][2]}`);
                                    }
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        advance_shop_cash[1].push(response)
                                        var form = new ModalFormData();
                                        form.title("HARUPhone1");
                                        form.textField("個数 (半角数字)", "0") 
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            advance_shop_cash[1].push(r.formValues[0])
                                            if(r.formValues[0]<=0){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §40以下は設定できません"}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                return;
                                            }
                                            if(r.formValues[0]==''){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §4個数を入力してください"}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                return;
                                            }
                                            if(Number(r.formValues[0])>advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][1]][2]){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §4在庫数をオーバーしています"}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                return;
                                            }
                                            var form = new ActionFormData();
                                            form.title("HARUPhone1");
                                            form.body(`§l注文内容\n\n§r商品名:§a${advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][1]][0]}\n§r個数:§a${advance_shop_cash[1][2]}§r合計金額:§b${advance_shop_cash[1][2]*advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][1]][1]}\n\n§r販売元:§a${advance_shop_system2[advance_shop_cash[1][0]][0]}`);
                                            form.button(`注文`)
                                            form.button(`閉じる`)
                                            form.show(player).then(r => {
                                                if (r.canceled) return;
                                                let response = r.selection;
                                                switch (response) {
                                                    case 0:
                                                        const score = world.scoreboard.getObjective("money").getScore(player.scoreboardIdentity);
                                                        if(score>=advance_shop_cash[1][2]*advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][1]][1]){
                                                            var advance_partner = ''
                                                            var advance_member = world.getDynamicProperty('advance_member')
                                                            if(advance_member==undefined){
                                                                var advance_member_system2=[]
                                                            }else{
                                                            var advance_member_system2 = JSON.parse(advance_member);
                                                            }  
                                                            for (let i = 0; i < advance_member_system2.length; i++){
                                                                if(advance_member_system2[i][1]==advance_shop_system2[advance_shop_cash[1][0]][0]){
                                                                    advance_partner=`${advance_member_system2[i][0]}`
                                                                }
                                                            }                              
                                                        advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][1]][2]=advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][1]][2]-advance_shop_cash[1][2]
                                                        advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][1]][3].push([player.name,advance_shop_cash[1][2],0])
                                                        advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][1]][4]=advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][1]][4]+1
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §a注文しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        player.runCommand(`tellraw @a[name="${advance_partner}"] {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §b${player.name}§aが§b${advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][1]][0]} [${advance_shop_system2[advance_shop_cash[1][0]][0]}]§aを注文しました"}]}`)
                                                        player.runCommand(`playsound random.toast @a[name="${advance_partner}"] ~ ~ ~ 1.0 1.7 0.5`)
                                                        var advance_member = world.getDynamicProperty('advance_member')
                                                        var advance_member_system2 = JSON.parse(advance_member);
                                                        for (let i = 0; i < advance_member_system2.length; i++){
                                                            if(advance_member_system2[i][1]==advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][0]){
                                                                advance_member_system2[i][3]=advance_member_system2[i][3]+advance_shop_cash[1][2]*advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][1]][1]
                                                            }
                                                        }
                                                        const advance_shop_system3 = JSON.stringify(advance_shop_system2);
                                                        world.setDynamicProperty('advance_shop',advance_shop_system3)
                                                        const advance_member_system3 = JSON.stringify(advance_member_system2);
                                                        world.setDynamicProperty('advance_member',advance_member_system3)
                                                        player.runCommand(`scoreboard players remove @s money ${advance_shop_cash[1][2]*advance_shop_system2[advance_shop_cash[0][advance_shop_cash[1][0]]][1][advance_shop_cash[1][1]][1]}`)
                                                    }else{
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §4所持金が不足しています"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                    }
                                                    break;
                                                }
                                            })
                                        })
                                    })
                                })
                            break;
                            case 2:
                                var advance_shop_pattern = []
                                var advance_shop = world.getDynamicProperty('advance_shop')
                                if(advance_shop==undefined){
                                    var advance_shop_system2=[]
                                }else{
                                var advance_shop_system2 = JSON.parse(advance_shop);
                                }
                                for (let i = 0; i < advance_shop_system2.length; i++){
                                    for (let i1 = 0; i1 < advance_shop_system2[i][1].length; i1++){
                                        for (let i2 = 0; i2 < advance_shop_system2[i][1][i1][3].length; i2++){
                                          if(advance_shop_system2[i][1][i1][3][i2][0]==player.name){
                                            advance_shop_pattern.push([advance_shop_system2[i][1][i1][0],advance_shop_system2[i][1][i1][3][i2]])
                                          }
                                        }
                                    }
                                }
                                var advance_shop_pattern_text = ''
                                for (let i = 0; i < advance_shop_pattern.length; i++){
                                    if(advance_shop_pattern[i][1][2]==0){
                                        var advance_shop_pattern_text_cash = '§9現在配送中です'
                                    }else{
                                        var advance_shop_pattern_text_cash = '§9配送完了'
                                    }
                                    advance_shop_pattern_text = advance_shop_pattern_text+`商品名:§b${advance_shop_pattern[i][0]}§r 個数:§a${advance_shop_pattern[i][1][1]}\n${advance_shop_pattern_text_cash}§r\n`
                                }
                                var form = new ActionFormData();
                                form.title("HARUPhone1");
                                form.body(`${advance_shop_pattern_text}`);
                                form.button(`閉じる`);
                                form.show(player).then(r => {
                                    if (r.canceled) return;
                                })
                            break;
                        }
                    })
                    break;
                    case 13:
                        var form = new ModalFormData();
                        form.title("HARUPhone1");
                        let hackList = [ "チートの使用", "破壊行為", "妨害行為", "ハラスメント","その他"]
                        form.textField("通報するゲーマータグ", `HARUGAMEs19706`) 
                        form.dropdown("内容", hackList)
                        form.textField("詳細", `具体的な内容`) 
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            var trouble_list = world.getDynamicProperty('trouble_list')
                                if(trouble_list==undefined){
                                    var trouble_list_system2=[]
                                }else{
                                var trouble_list_system2 = JSON.parse(trouble_list);
                                }
                                trouble_list_system2.push([r.formValues[0],r.formValues[1],r.formValues[2],player.name])
                                const trouble_list_system3 = JSON.stringify(trouble_list_system2);
                                world.setDynamicProperty('trouble_list',trouble_list_system3)
                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(通報/報告)§r] §a通報しました"}]}`)
                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                        })
                    break;
                    case 14:
                        var short_data_cash1 = [[],[]];
                        var short_data = world.getDynamicProperty('short_data')
                        if(short_data==undefined){
                            var short_data_system2=[]
                        }else{
                        var short_data_system2 = JSON.parse(short_data);
                        }
                        var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body("サービスを選択");
                        form.button("§1パーティーを作成");
                        form.button("§5招待を確認");
                        for (let i = 0; i < short_data_system2.length; i++){
                            for (let i1 = 0; i1 < short_data_system2[i][1].length; i1++){
                            if(short_data_system2[i][1][i1]==player.name&&short_data_system2[i][2][i1]==1){
                                form.button(`§l${short_data_system2[i][0]}`);
                                short_data_cash1[0].push(i)
                            }
                            }
                        }
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response1 = r.selection;
                            switch (response1) {
                                case 0:
                                    var short_data = world.getDynamicProperty('short_data')
                                    if(short_data==undefined){
                                        var short_data_system2=[]
                                    }else{
                                    var short_data_system2 = JSON.parse(short_data);
                                    }
                                    var form = new ModalFormData();
                                    form.title("HARUPhone1");
                                    form.textField("パーティー名", ``) 
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        short_data_system2.push([r.formValues[0],[player.name],[1],[]])
                                        const short_data_system3 = JSON.stringify(short_data_system2);
                                        world.setDynamicProperty('short_data',short_data_system3)
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §aパーティーを作成しました"}]}`) 
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                    })
                                break;
                                case 1:
                                    var short_data_cash2 = [[],[],0]
                                    var short_data = world.getDynamicProperty('short_data')
                                    if(short_data==undefined){
                                        var short_data_system2=[]
                                    }else{
                                    var short_data_system2 = JSON.parse(short_data);
                                    }
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("参加するパーティーを選択");
                                    for (let i = 0; i < short_data_system2.length; i++){
                                        for (let i1 = 0; i1 < short_data_system2[i][1].length; i1++){
                                            if(short_data_system2[i][1][i1]==player.name&&short_data_system2[i][2][i1]==0){
                                                form.button(`${short_data_system2[i][0]}`);
                                                short_data_cash2[0].push(i)
                                                short_data_cash2[1].push(i1)
                                                short_data_cash2[2]=1
                                            }
                                        }
                                    }
                                    if(short_data_cash2[2]==0){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §a招待がありません"}]}`) 
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        short_data_system2[short_data_cash2[0][response]][2][short_data_cash2[1][response]]=1
                                        const short_data_system3 = JSON.stringify(short_data_system2);
                                        world.setDynamicProperty('short_data',short_data_system3)
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §aパーティーに参加しました"}]}`) 
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                    })
                                break;
                            }
                            if(response1!=0&&response1!=1){
                                var short_data = world.getDynamicProperty('short_data')
                                if(short_data==undefined){
                                    var short_data_system2=[]
                                }else{
                                var short_data_system2 = JSON.parse(short_data);
                                }
                            short_data_cash1[1].push(response1-2)
                            var form = new ActionFormData();
                            form.title("HARUPhone1");
                            form.body("サービスを選択");
                            form.button("メッセージを表示");
                            form.button("メッセージを送信");
                            form.button("メンバーリスト");
                            form.button("パーティー設定");
                            form.show(player).then(r => {
                                if (r.canceled) return;
                                let response = r.selection;
                                switch (response) {
                                    case 0:
                                        var short_data = world.getDynamicProperty('short_data')
                                        if(short_data==undefined){
                                            var short_data_system2=[]
                                        }else{
                                        var short_data_system2 = JSON.parse(short_data);
                                        }
                                        var short_data_text = ''
                                        for (let i = 0; i < short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][3].length; i++){
                                         short_data_text = short_data_text+`§a${short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][3][i][1]}\n§r ${short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][3][i][0]}\n\n`
                                        }
                                        var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body(`${short_data_text}`);
                                        form.button("メッセージを送信");
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            switch (response) {
                                                case 0:
                                                    var form = new ModalFormData();
                                                    form.title("HARUPhone1");
                                                    form.textField("メッセージを入力", ``) 
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][3].push([r.formValues[0],player.name])
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §aメッセージを送信しました"}]}`) 
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        const short_data_system3 = JSON.stringify(short_data_system2);
                                                        world.setDynamicProperty('short_data',short_data_system3)
                                                    })
                                                break;
                                            }
                                        })
                                    break;
                                    case 1:
                                        var short_data = world.getDynamicProperty('short_data')
                                        if(short_data==undefined){
                                            var short_data_system2=[]
                                        }else{
                                        var short_data_system2 = JSON.parse(short_data);
                                        }
                                        var form = new ModalFormData();
                                        form.title("HARUPhone1");
                                        form.textField("メッセージを入力", ``) 
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][3].push([r.formValues[0],player.name])
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §aメッセージを送信しました"}]}`) 
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                            const short_data_system3 = JSON.stringify(short_data_system2);
                                            world.setDynamicProperty('short_data',short_data_system3)
                                        })
                                    break;
                                    case 2:
                                        var short_data = world.getDynamicProperty('short_data')
                                        if(short_data==undefined){
                                            var short_data_system2=[]
                                        }else{
                                        var short_data_system2 = JSON.parse(short_data);
                                        }
                                        var short_data_memberList = ''
                                            for (let i = 0; i < short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][1].length; i++){
                                                if(short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][2][i]==1){
                                                short_data_memberList = short_data_memberList+`§a・${short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][1][i]}\n`
                                                }
                                            }
                                            var form = new ActionFormData();
                                            form.title("HARUPhone1");
                                            form.body(`メンバーリスト\n\n${short_data_memberList}`);
                                            form.button("閉じる");
                                            form.show(player).then(r => {
                                                if (r.canceled) return;
                                                let response = r.selection;
                                                switch (response) {
                                                    case 0:
                                                    break;
                                                }
                                            })   
                                    break;
                                    case 3:
                                        var short_data = world.getDynamicProperty('short_data')
                                        if(short_data==undefined){
                                            var short_data_system2=[]
                                        }else{
                                        var short_data_system2 = JSON.parse(short_data);
                                        }
                                        if(short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][1][0]!=player.name){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §4パーティー作成者のみ設定を行えます"}]}`) 
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("サービスを選択");
                                        form.button("§5メンバーを招待する");
                                        form.button("§1メッセージ履歴の削除/整理");
                                        form.button("§4パーティーの削除");
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            switch (response) {
                                                case 0:
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("サービスを選択");
                                                    form.button("オンラインのプレイヤーから指定する");
                                                    form.button("ゲーマータグを入力して指定する");
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        switch (response) {
                                                            case 0:
                                                                var short_data = world.getDynamicProperty('short_data')
                                                                if(short_data==undefined){
                                                                    var short_data_system2=[]
                                                                }else{
                                                                var short_data_system2 = JSON.parse(short_data);
                                                                }
                                                                var players = world.getAllPlayers()
                                                                var form = new ActionFormData();
                                                                form.title("HARUPhone1");
                                                                form.body("招待するプレイヤーを選択");
                                                                for (let i = 0; i < players.length; i++){
                                                                    form.button(`${players[i].name}`);
                                                                }
                                                                form.show(player).then(r => {
                                                                    if (r.canceled) return;
                                                                    let response = r.selection;
                                                                    var short_data_cash3 = 0
                                                                    for (let i = 0; i < short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][1].length; i++){
                                                                        if(short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][1][i]==players[response].name){
                                                                            short_data_cash3 = 1
                                                                            if(short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][2][i]==0){
                                                                                short_data_cash3 = 2
                                                                            }
                                                                        }
                                                                    }
                                                                    if(short_data_cash3==1){
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §4指定したプレイヤーは既にパーティーに参加しています"}]}`) 
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                        return;
                                                                    }
                                                                    if(short_data_cash3==2){
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §4指定したプレイヤーは既に招待しています"}]}`) 
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                        return;
                                                                    }
                                                                    short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][1].push(players[response].name)
                                                                    short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][2].push(0)
                                                                    const short_data_system3 = JSON.stringify(short_data_system2);
                                                                    world.setDynamicProperty('short_data',short_data_system3)
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §a${players[response].name}を招待しました"}]}`) 
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                })
                                                            break;
                                                            case 1:
                                                                var short_data = world.getDynamicProperty('short_data')
                                                                if(short_data==undefined){
                                                                    var short_data_system2=[]
                                                                }else{
                                                                var short_data_system2 = JSON.parse(short_data);
                                                                }
                                                                var form = new ModalFormData();
                                                                form.title("HARUPhone1");
                                                                form.textField("招待するゲーマータグ", ``) 
                                                                form.show(player).then(r => {
                                                                    if (r.canceled) return;
                                                                    var short_data_cash3 = 0
                                                                    for (let i = 0; i < short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][1].length; i++){
                                                                        if(short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][1][i]==r.formValues[0]){
                                                                            short_data_cash3 = 1
                                                                            if(short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][2][i]==0){
                                                                                short_data_cash3 = 2
                                                                            }
                                                                        }
                                                                    }
                                                                    if(short_data_cash3==1){
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §4指定したプレイヤーは既にパーティーに参加しています"}]}`) 
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                        return;
                                                                    }
                                                                    if(short_data_cash3==2){
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §4指定したプレイヤーは既に招待しています"}]}`) 
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                        return;
                                                                    }
                                                                    short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][1].push(r.formValues[0])
                                                                    short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][2].push(0)
                                                                    const short_data_system3 = JSON.stringify(short_data_system2);
                                                                    world.setDynamicProperty('short_data',short_data_system3)
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §a${r.formValues[0]}を招待しました"}]}`) 
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                })
                                                            break;
                                                        }
                                                    })

                                                break;
                                                case 1:
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("機能を選択")
                                                    form.button("すべてメッセージを削除する");
                                                    form.button("範囲を指定してメッセージを削除する");
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        switch (response) {
                                                            case 0:
                                                                var short_data = world.getDynamicProperty('short_data')
                                                                if(short_data==undefined){
                                                                    var short_data_system2=[]
                                                                }else{
                                                                var short_data_system2 = JSON.parse(short_data);
                                                                }
                                                                var form = new ActionFormData();
                                                                form.title("HARUPhone1");
                                                                form.body("本当に削除しますか?")
                                                                form.button("削除する");
                                                                form.button("キャンセル");
                                                                form.show(player).then(r => {
                                                                    if (r.canceled) return;
                                                                    let response = r.selection;
                                                                    switch (response) {
                                                                        case 0:
                                                                            short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][3]=[]
                                                                            const short_data_system3 = JSON.stringify(short_data_system2);
                                                                            world.setDynamicProperty('short_data',short_data_system3)
                                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §aメッセージを削除しました"}]}`) 
                                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                        break;
                                                                    }
                                                                })
                                                            break;
                                                            case 1:
                                                                var short_data = world.getDynamicProperty('short_data')
                                                                if(short_data==undefined){
                                                                    var short_data_system2=[]
                                                                }else{
                                                                var short_data_system2 = JSON.parse(short_data);
                                                                }
                                                                var form = new ModalFormData();
                                                                form.title("HARUPhone1");
                                                                form.textField("削除点[半角数字]", `0`) 
                                                                form.textField("削除数[半角数字]", ``) 
                                                                form.show(player).then(r => {
                                                                    if (r.canceled) return;
                                                                    short_data_system2[short_data_cash1[0][short_data_cash1[1][0]]][3].splice(r.formValues[0],r.formValues[1])
                                                                    const short_data_system3 = JSON.stringify(short_data_system2);
                                                                    world.setDynamicProperty('short_data',short_data_system3)
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §b${r.formValues[0]}§aを基準に§b${r.formValues[1]}§a個メッセージを削除しました"}]}`) 
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                })
                                                            break;
                                                        }
                                                    })
                                                break;
                                                case 2:
                                                    var short_data = world.getDynamicProperty('short_data')
                                                    if(short_data==undefined){
                                                        var short_data_system2=[]
                                                    }else{
                                                    var short_data_system2 = JSON.parse(short_data);
                                                    }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("本当に削除しますか?")
                                                    form.button("削除する");
                                                    form.button("キャンセル");
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        switch (response) {
                                                            case 0:
                                                                short_data_system2.splice(short_data_cash1[0][short_data_cash1[1][0]],1)
                                                                const short_data_system3 = JSON.stringify(short_data_system2);
                                                                world.setDynamicProperty('short_data',short_data_system3)
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(short)§r] §aパーティーを削除しました"}]}`) 
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                            break;
                                                        }
                                                    })
                                                break;
                                            }
                                        })
                                    break;
                                }
                            })
                        }
                        })
                    break;
                    case 15:
                        var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body("サービスを選択");
                        form.button("§1ルーレット");
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response = r.selection;
                            switch (response) {
                                case 0:
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("設定を選択");
                                    form.button("§1チップを購入");
                                    form.button("§1チップを換金");
                                    form.button("§1ゲーム開始");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:           
                                            var form = new ActionFormData();
                                            form.title("HARUPhone1");
                                            form.body("§a5枚購入します (5枚ずつしか購入できません)");
                                            form.button("§2確定");
                                            form.button("キャンセル");
                                            form.show(player).then(r => {
                                                if (r.canceled) return;
                                                let response = r.selection;
                                                switch (response) {
                                                    case 0:  
                                                    const score = world.scoreboard.getObjective("money").getScore(player.scoreboardIdentity);
                                                    if(score>=(Number(5)*100)){
                                                    player.runCommand(`give @s additem:hyoutaroucoin 5`)
                                                    player.runCommand(`scoreboard players remove @s money ${Number(5)*100}`)
                                                    var harupay_op_money = 0
                                                    if(world.getDynamicProperty('harupay_op_money')!=undefined){
                                                        harupay_op_money=world.getDynamicProperty('harupay_op_money')
                                                    }
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ)§r] §aチップを5枚購入しました"}]}`) 
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ)§r] §a${Number(5)*100}PAY支払いました"}]}`) 
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                    world.setDynamicProperty('harupay_op_money',Number(harupay_op_money)+Number(5)*100)
                                                    }else{
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ)§r] §4moneyが不足しています"}]}`) 
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                        return;
                                                    }  
                                                    break;
                                                }
                                            })
                                            break;
                                            case 1:
                                                var form = new ModalFormData();
                                                form.title("HARUPhone1");
                                                form.textField("10枚以下は換金できません\n換金額は1枚 §b100PAY\n換金する枚数", `0`) 
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    if(r.formValues==''){
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ)§r] §4入力してください"}]}`) 
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                        return;
                                                    }
                                                    if (r.formValues[0]<0){
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUPAY)§r] §40以下は設定できません"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                        return;
                                                    }    
                                                    if (r.formValues[0]<=10){
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(HARUPAY)§r] §410枚以下では換金できません"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                        return;
                                                    } 
                                                    var harupay_op_money = 0
                                                    if(world.getDynamicProperty('harupay_op_money')!=undefined){
                                                        harupay_op_money=world.getDynamicProperty('harupay_op_money')
                                                    }           
                                                    player.runCommand(`tag @s[hasitem={item=additem:hyoutaroucoin,quantity=..${(Number(r.formValues[0]))-1}}] add casino_stop`)
                                                    if(player.hasTag('casino_stop')){
                                                       player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ)§r] §4チップが不足しています"}]}`)
                                                       player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                       player.runCommand(`tag @s remove casino_stop`)
                                                       return;
                                                    }
                                                       player.runCommand(`clear @s additem:hyoutaroucoin 0 ${Number(r.formValues[0])}`)
                                                       player.runCommand(`scoreboard players add @s money ${Number(r.formValues[0])*100}`)
                                                       world.setDynamicProperty('harupay_op_money',Number(harupay_op_money)-Number(r.formValues[0])*100)
                                                       player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ)§r] §aチップを${r.formValues[0]}枚換金しました"}]}`) 
                                                       player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ)§r] §a${Number(r.formValues[0])*100}PAY受け取りました"}]}`) 
                                                       player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                })
                                            break;
                                            case 2:
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("§lルール説明\n§r§cゲームが開始されると§4赤§1青§e黄§2緑§rの4つのボタンが出てきます\nその4つのうち1つが当たりのボタンです.ボタンを押した後に,チップを賭けます（最大2つまで賭けれます）\n当たりであれば賭けたチップ数を貰えます（賭けたチップも帰ってきます！）.逆に外れであれば賭けたチップは回収されます");
                                                form.button("ゲームに進む");
                                                form.button("閉じる");
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    switch (response) {
                                                        case 0:
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body("ボタンを選択して下さい");
                                                            form.button("§4赤");
                                                            form.button("§1青");
                                                            form.button("§e黄");
                                                            form.button("§2緑");
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                var form = new ModalFormData();
                                                                form.title("HARUPhone1");
                                                                form.textField("賭ける数を入力し送信すると結果が表示されます\n賭ける数", `MAX 2`) 
                                                                form.show(player).then(r => {
                                                                    if (r.canceled) return;
                                                                    if(Number(r.formValues)>2){
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ)§r] §4賭けれる数は最大2です"}]}`) 
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                        return;
                                                                    }
                                                                    if(r.formValues==''){
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ)§r] §4入力してください"}]}`) 
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                        return;
                                                                    }
                                                                    if (Number(r.formValues[0]<0)){
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ))§r] §40以下は設定できません"}]}`)
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                        return;
                                                                    }
                                                                     player.runCommand(`tag @s[hasitem={item=additem:hyoutaroucoin,quantity=..${(Number(r.formValues[0]))-1}}] add casino_stop`)
                                                                     if(player.hasTag('casino_stop')){
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ)§r] §4チップが不足しています"}]}`)
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                        player.runCommand(`tag @s remove casino_stop`)
                                                                        return;
                                                                     }
                                                                    const randomNumber = Math.floor(Math.random() * 3);
                                                                    if(randomNumber==response){
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ)§r] §e当たりです！！"}]}`) 
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 2 0.5`)
                                                                        player.runCommand(`give @s additem:hyoutaroucoin ${r.formValues[0]}`)
                                                                    }else{
                                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(カジノ))§r] §cあっ...外れっすねw どんまいどんまい^^"}]}`)
                                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                        player.runCommand(`clear @s additem:hyoutaroucoin 0 ${Number(r.formValues[0])}`)
                                                                    }
                                                                })
                                                            })
                                                        break;
                                                        case 1:
                                                            
                                                        break;
                                                    }
                                                })
                                            break;
                                        }
                                    })
                                break;
                            }
                        })
                    break;
                    case 16:
                        //管理者専門画面
                        var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body("設定を選択");
                        form.button("§lHARUPAYログ\n§r§9全プレイヤーの取引履歴を確認できます");
                        form.button("§lキャッシュデーターの削除\n§r§9サーバー混雑時の不具合を対処できます");
                        form.button("§lQuickデータ編集\n§r§9Quickの商品を管理者権限で削除できます");
                        form.button("§l仕事依頼データ編集\n§r§9仕事依頼を管理者権限で削除できます");
                        form.button("§l初期金額の再設定\n§r§9初期配布金額を再設定できます");
                        form.button("§l換金データ編集\n§r§9換金金額やアイテムを設定できます");
                        form.button("§l新規プレイヤーにスマホ/マネー付与");
                        form.button("§lQuick相場情報の編集\n§r§9Quick相場情報を追加/編集/削除できます");
                        form.button("§l購入データ編集\n§r§9購入金額やアイテムを設定できます");
                        form.button("§l自動付与システム\n§r§9自動付与システムをオン/オフできます");
                        form.button("§lブラウザデータ編集\n§r§9ページを管理者権限で削除できます");
                        form.button("§l機能利用金額のカスタマイズ\n§r§9様々な機能の利用金額を設定できます");
                        form.button("§l広告データ編集\n§r§9広告データを管理者権限で削除できます");
                        form.button("§l通報/報告確認\n§r§9通報報告を確認できます");
                        form.button("§l経済コントロールデータ\n§r§9経済調整に必要な情報を確認できます");
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response = r.selection;
                            switch (response) {
                                case 0:
                                    var  harupay_logs_list = '';
                                    for (let i = 0; i < harupay_logs.length; i++){
                                        harupay_logs_list = harupay_logs_list+`${harupay_logs[i]}\n`
                                    }
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body(`HARUPAYlog\n${harupay_logs_list}`);
                                    form.button("§0閉じる");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                            break;
                                            default: break;
                                        }
                                    })
                                    break;
                                case 1:
                                    //キャッシュデータの削除
                                    cashdataA(player);//レジ関連
                                    cashdataB(player);//HARUPhone関連
                                    cashdataC(player);//HARUPhone関連
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §aキャッシュデータを削除しました"}]}`) 
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                    break;         
                                     case 2:
                                        if(shop_menu[0]==undefined){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §aデータがありません"}]}`) 
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                          return
                                        }
                                        var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("shop_menuデータ");
                                        for (let i = 0; i < shop_menu.length; i++){
                                            form.button(`§l${shop_menu[i][0]}\n§r額:§b${shop_menu[i][2]}§rPAY  出品者:§2${shop_menu[i][1]}`);
                                        }
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §a${shop_menu[response]}を削除しました"}]}`) 
                                            shop_menu.splice( response, 1 );
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                        }
                                        )
                                    break;
                                    case 3:
                                        if(quest[0]==undefined){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §aデータがありません"}]}`) 
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                          return
                                        }
                                        var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("shop_menuデータ");
                                        for (let i = 0; i < quest.length; i++){
                                            form.button(`§l${quest[i][0]}\n§r報酬額:§b${quest[i][2]}§rPAY  依頼者:§2${quest[i][3]}`);
                                        }
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §a${quest[response]}を削除しました"}]}`) 
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                            quest.splice( response, 1 );
                                        }
                                        )
                                       
                                    break;
                                    case 4:
                                        world.setDynamicProperty('op_fast', undefined)
                                    break;
                                    case 5:
                                        var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("機能を選択");
                                        form.button("§l追加");
                                        form.button("§l編集");
                                        form.button("§l削除");
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            switch (response) {
                                                case 0:
                                                    var form = new ModalFormData();
                                                    form.textField("アイテム名", "ダイアモンド")
                                                    form.textField("アイテム換金金額", "0") 
                                                    form.textField("アイテムID", "diamond")
                                                    form.textField("アイコンパス(任意)", "items/diamond")
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        var kannkin_information = world.getDynamicProperty('kannkin_information')
                                                        if(kannkin_information==undefined){
                                                            var kannkin_information_system2=[]
                                                        }else{
                                                        var kannkin_information_system2 = JSON.parse(kannkin_information);
                                                        }
                                                        kannkin_information_system2.push([r.formValues[0],r.formValues[1],r.formValues[2],r.formValues[3]])
                                                        const kannkin_information_system3 = JSON.stringify(kannkin_information_system2);
                                                        world.setDynamicProperty('kannkin_information',kannkin_information_system3)
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a追加しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        var kannkin_log = world.getDynamicProperty('kannkin_log')
                                                        if(kannkin_log==undefined){
                                                            var kannkin_log_system2=[]
                                                        }else{
                                                        var kannkin_log_system2 = JSON.parse(kannkin_log);
                                                        }
                                                        kannkin_log_system2.push(0)
                                                        const kannkin_log_system3 = JSON.stringify(kannkin_log_system2);
                                                        world.setDynamicProperty('kannkin_log',kannkin_log_system3)
                                                    })
                                                break;
                                                case 1:
                                                    var kannkin_information = world.getDynamicProperty('kannkin_information')
                                                        if(kannkin_information==undefined){
                                                            var kannkin_information_system2=[]
                                                        }else{
                                                        var kannkin_information_system2 = JSON.parse(kannkin_information);
                                                        }
                                                        if(kannkin_information_system2[0]==undefined){
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a編集できるアイテムがありません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            return;
                                                        }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("編集する換金アイテム/ブロックを選択");
                                                    for (let i = 0; i < kannkin_information_system2.length; i++){
                                                        form.button(`${kannkin_information_system2[i][0]}:${kannkin_information_system2[i][1]}`);
                                                    }
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        var form = new ModalFormData();
                                                        form.textField("アイテム名", `${kannkin_information_system2[response][0]}`)
                                                        form.textField("アイテム金額", `${kannkin_information_system2[response][1]}`) 
                                                        form.textField("アイテムID", `${kannkin_information_system2[response][2]}`)
                                                        form.textField("アイコンパス(任意)", `${kannkin_information_system2[response][3]}`) 
                                                        form.show(player).then(r => {
                                                            if (r.canceled) return;
                                                            if(r.formValues[0]!=''){kannkin_information_system2[response][0]=r.formValues[0]}
                                                            if(r.formValues[1]!=''){kannkin_information_system2[response][1]=r.formValues[1]}
                                                            if(r.formValues[2]!=''){kannkin_information_system2[response][2]=r.formValues[2]}
                                                            if(r.formValues[3]!=''){kannkin_information_system2[response][3]=r.formValues[3]}
                                                            const kannkin_information_system3 = JSON.stringify(kannkin_information_system2);
                                                            world.setDynamicProperty('kannkin_information',kannkin_information_system3)
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a編集しました"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        })
                                                    })
                                                break;
                                                case 2:
                                                    var kannkin_information = world.getDynamicProperty('kannkin_information')
                                                        if(kannkin_information==undefined){
                                                            var kannkin_information_system2=[]
                                                        }else{
                                                        var kannkin_information_system2 = JSON.parse(kannkin_information);
                                                        }
                                                        if(kannkin_information_system2[0]==undefined){
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a削除できるアイテムがありません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            return;
                                                        }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("削除する換金アイテム/ブロックを選択");
                                                    for (let i = 0; i < kannkin_information_system2.length; i++){
                                                        form.button(`${kannkin_information_system2[i][0]}:${kannkin_information_system2[i][1]}`);
                                                    }
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        kannkin_information_system2.splice( response, 1 );
                                                        if(kannkin_information_system2==[]){
                                                            kannkin_information_system2=undefined
                                                        }
                                                        const kannkin_information_system3 = JSON.stringify(kannkin_information_system2);
                                                        world.setDynamicProperty('kannkin_information',kannkin_information_system3)
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a削除しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        var kannkin_log = world.getDynamicProperty('kannkin_log')
                                                        if(kannkin_log==undefined){
                                                            var kannkin_log_system2=[]
                                                        }else{
                                                        var kannkin_log_system2 = JSON.parse(kannkin_log);
                                                        }
                                                        kannkin_log_system2.splice( response, 1 );
                                                        const kannkin_log_system3 = JSON.stringify(kannkin_log_system2);
                                                        world.setDynamicProperty('kannkin_log',kannkin_log_system3)
                                                    })
                                                break;
                                            }
                                        })          
                                    break;
                                    case 6:
                                        var players = world.getAllPlayers()
                                        var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("新規プレイヤーにスマホ/Money付与");
                                        for (let i = 0; i < players.length; i++){
                                         form.button(`${players[i].name}`)   
                                        }
                                        form.show(player).then(r => {
                                            let response = r.selection;
                                            if (r.canceled) {
                                                return;
                                            }
                                            var partner1 = players[response];
                                            if(partner1.hasTag('HARUPAY_Member')){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §4このPlayerは付与済みです"}]}`) 
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                return;
                                            }
                                            partner1.runCommand("give @s additem:haruphone1");
                                            partner1.runCommand(`scoreboard players add @s money ${world.getDynamicProperty('start_money')}`);
                                            partner1.runCommand(`scoreboard players add @s account 0`);
                                            partner1.runCommand("tag @s add HARUPAY_Member")
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §eこのPlayerに付与しました"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                      })
                                    break;
                                    case 7:
                                        var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("機能を選択");
                                        form.button("§l追加");
                                        form.button("§l編集");
                                        form.button("§l削除");
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            switch (response) {
                                                case 0:
                                                    var form = new ModalFormData();
                                                    form.textField("アイテム名", "ダイアモンドなど")
                                                    form.textField("アイテム金額", "0") 
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        var quick_information = world.getDynamicProperty('quick_information')
                                                        if(quick_information==undefined){
                                                            var quick_information_system2=[]
                                                        }else{
                                                        var quick_information_system2 = JSON.parse(quick_information);
                                                        }
                                                        quick_information_system2.push([r.formValues[0],r.formValues[1]])
                                                        const quick_information_system3 = JSON.stringify(quick_information_system2);
                                                        world.setDynamicProperty('quick_information',quick_information_system3)
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(情報)§r] §a追加しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                    })
                                                break;
                                                case 1:
                                                    var quick_information = world.getDynamicProperty('quick_information')
                                                        if(quick_information==undefined){
                                                            var quick_information_system2=[]
                                                        }else{
                                                        var quick_information_system2 = JSON.parse(quick_information);
                                                        }
                                                        if(quick_information_system2[0]==undefined){
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(情報)§r] §a編集できるアイテムがありません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            return;
                                                        }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("編集する情報を選択");
                                                    for (let i = 0; i < quick_information_system2.length; i++){
                                                        form.button(`${quick_information_system2[i][0]}:${quick_information_system2[i][1]}`);
                                                    }
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        var form = new ModalFormData();
                                                        form.textField("アイテム名", `${quick_information_system2[response][0]}`)
                                                        form.textField("アイテム金額", `${quick_information_system2[response][1]}`) 
                                                        form.show(player).then(r => {
                                                            if (r.canceled) return;
                                                            if(r.formValues[0]!=''){quick_information_system2[response][0]=r.formValues[0]}
                                                            if(r.formValues[1]!=''){quick_information_system2[response][1]=r.formValues[1]}
                                                            const quick_information_system3 = JSON.stringify(quick_information_system2);
                                                            world.setDynamicProperty('quick_information',quick_information_system3)
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(情報)§r] §a編集しました"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        })
                                                    })
                                                break;
                                                case 2:
                                                    var quick_information = world.getDynamicProperty('quick_information')
                                                        if(quick_information==undefined){
                                                            var quick_information_system2=[]
                                                        }else{
                                                        var quick_information_system2 = JSON.parse(quick_information);
                                                        }
                                                        if(quick_information_system2[0]==undefined){
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(情報)§r] §a削除できるアイテムがありません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            return;
                                                        }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("削除する情報を選択");
                                                    for (let i = 0; i < quick_information_system2.length; i++){
                                                        form.button(`${quick_information_system2[i][0]}:${quick_information_system2[i][1]}`);
                                                    }
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        quick_information_system2.splice( response, 1 );
                                                        if(quick_information_system2==[]){
                                                            quick_information_system2=undefined
                                                        }
                                                        const quick_information_system3 = JSON.stringify(quick_information_system2);
                                                        world.setDynamicProperty('quick_information',quick_information_system3)
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(情報)§r] §a削除しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                    })
                                                break;
                                            }
                                        })  
                                    break;
                                    case 8:
                                        var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("編集項目を選択...");
                                        form.button("§l追加");
                                        form.button("§l編集");
                                        form.button("§l削除");
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            switch (response) {
                                                case 0:
                                                    var form = new ModalFormData();
                                                    form.textField("アイテム名", "ダイアモンド")
                                                    form.textField("アイテム金額", "0") 
                                                    form.textField("アイテムID", "diamond")
                                                    form.textField("アイコンパス(任意)", "items/diamond")
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        var kounyuu_list = world.getDynamicProperty('kounyuu_list')
                                                        if(kounyuu_list==undefined){
                                                            var kounyuu_list_system2=[]
                                                        }else{
                                                        var kounyuu_list_system2 = JSON.parse(kounyuu_list);
                                                        }
                                                        kounyuu_list_system2.push([r.formValues[0],r.formValues[1],r.formValues[2],r.formValues[3]])
                                                        const kounyuu_list_system3 = JSON.stringify(kounyuu_list_system2);
                                                        world.setDynamicProperty('kounyuu_list',kounyuu_list_system3)
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a追加しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        var kounyuu_log = world.getDynamicProperty('kounyuu_log')
                                                        if(kounyuu_log==undefined){
                                                            var kounyuu_log_system2=[]
                                                        }else{
                                                        var kounyuu_log_system2 = JSON.parse(kounyuu_log);
                                                        }
                                                        kounyuu_log_system2.push(0)
                                                        const kounyuu_log_system3 = JSON.stringify(kounyuu_log_system2);
                                                        world.setDynamicProperty('kounyuu_log',kounyuu_log_system3)
                                                    })
                                                break;
                                                case 1:
                                                    var kounyuu_list = world.getDynamicProperty('kounyuu_list')
                                                        if(kounyuu_list==undefined){
                                                            var kounyuu_list_system2=[]
                                                        }else{
                                                        var kounyuu_list_system2 = JSON.parse(kounyuu_list);
                                                        }
                                                        if(kounyuu_list_system2[0]==undefined){
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a編集できるアイテムがありません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            return;
                                                        }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("編集するアイテム/ブロックを選択");
                                                    for (let i = 0; i < kounyuu_list_system2.length; i++){
                                                        form.button(`${kounyuu_list_system2[i][0]} 1個/§b${kounyuu_list_system2[i][1]}§r`,`textures/${kounyuu_list_system2[i][3]}`);
                                                    }
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        var form = new ModalFormData();
                                                        form.textField("アイテム名", `${kounyuu_list_system2[response][0]}`)
                                                        form.textField("アイテム金額", `${kounyuu_list_system2[response][1]}`) 
                                                        form.textField("アイテムID", `${kounyuu_list_system2[response][2]}`)
                                                        form.textField("アイコンパス(任意)", `${kounyuu_list_system2[response][3]}`)
                                                        form.show(player).then(r => {
                                                            if (r.canceled) return;
                                                            if(r.formValues[0]!=''){kounyuu_list_system2[response][0]=r.formValues[0]}
                                                            if(r.formValues[1]!=''){kounyuu_list_system2[response][1]=r.formValues[1]}
                                                            if(r.formValues[2]!=''){kounyuu_list_system2[response][2]=r.formValues[2]}
                                                            if(r.formValues[3]!=''){kounyuu_list_system2[response][3]=r.formValues[3]}
                                                            const kounyuu_list_system3 = JSON.stringify(kounyuu_list_system2);
                                                            world.setDynamicProperty('kounyuu_list',kounyuu_list_system3)
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a編集しました"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        })
                                                    })
                                                break;
                                                case 2:
                                                    var kounyuu_list = world.getDynamicProperty('kounyuu_list')
                                                        if(kounyuu_list==undefined){
                                                            var kounyuu_list_system2=[]
                                                        }else{
                                                        var kounyuu_list_system2 = JSON.parse(kounyuu_list);
                                                        }
                                                        if(kounyuu_list_system2[0]==undefined){
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a削除できるアイテムがありません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            return;
                                                        }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("削除するアイテム/ブロックを選択");
                                                    for (let i = 0; i < kounyuu_list_system2.length; i++){
                                                        form.button(`${kounyuu_list_system2[i][0]} 1個/§b${kounyuu_list_system2[i][1]}§r`,`textures/${kounyuu_list_system2[i][3]}`);
                                                    }
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        kounyuu_list_system2.splice( response, 1 );
                                                        if(kounyuu_list_system2==[]){
                                                            kounyuu_list_system2=undefined
                                                        }
                                                        const kounyuu_list_system3 = JSON.stringify(kounyuu_list_system2);
                                                        world.setDynamicProperty('kounyuu_list',kounyuu_list_system3)
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a削除しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                    })
                                                break;
                                            }
                                        })
                                        
                                    break;
                                    case 9:
                                        var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("設定を選択...");
                                        form.button("§lオン");
                                        form.button("§lオフ");
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            switch (response) {
                                                case 0:
                                                    world.setDynamicProperty('money_start_system2',0)
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §aオンにしました"}]}`)
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                break;
                                                case 1:
                                                    world.setDynamicProperty('money_start_system2',1)
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §aオフにしました"}]}`)
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                break;
                                            }
                                        })
                                    break;
                                    case 10:
                                                    var browser = world.getDynamicProperty('browser')
                                                        if(browser==undefined){
                                                            var browser_system2=[]
                                                        }else{
                                                        var browser_system2 = JSON.parse(browser);
                                                        }
                                                        if(browser_system2[0]==undefined){
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a削除できるページがありません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            return;
                                                        }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("削除するページを選択");
                                                    for (let i = 0; i < browser_system2.length; i++){
                                                        form.button(`§l${browser_system2[i][2]}\n§r${browser_system2[i][3]}`);
                                                    }
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        browser_system2.splice( response , 1 );
                                                        const browser_system3 = JSON.stringify(browser_system2);
                                                        world.setDynamicProperty('browser',browser_system3)
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §aページを削除しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                    })
                                        
                                break;
                                case 11:
                                    var form = new ActionFormData();
                                        form.title("HARUPhone1");
                                        form.body("設定を選択...");
                                        form.button("§r「§2browser§r」§rページ投稿金額設定");
                                        form.button("§r「§2browser§r」§r広告化金額設定");
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                            switch (response) {
                                                case 0:
                                                    var form = new ModalFormData();
                                                    form.textField("ページ投稿金額(半角数字)", `${world.getDynamicProperty('browser_newpage_money')}`)
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        world.setDynamicProperty('browser_newpage_money',r.formValues[0])
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §aページ投稿金額を設定しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                    })
                                                break;
                                                case 1:
                                                    var form = new ModalFormData();
                                                    form.textField("広告化金額(半角数字)", `${world.getDynamicProperty('browser_performance_money')}`)
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        world.setDynamicProperty('browser_performance_money',r.formValues[0])
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a広告化金額を設定しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                    })
                                                break;
                                            }
                                        })
                                break;
                                case 12:
                                                    var browser = world.getDynamicProperty('performance')
                                                        if(browser==undefined){
                                                            var browser_system2=[]
                                                        }else{
                                                        var browser_system2 = JSON.parse(browser);
                                                        }
                                                        if(browser_system2[0]==undefined){
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a削除できる広告がありません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            return;
                                                        }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("削除するページを選択");
                                                    for (let i = 0; i < browser_system2.length; i++){
                                                        form.button(`§l${browser_system2[i][2]}\n§r${browser_system2[i][3]}`);
                                                    }
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        browser_system2.splice( response , 1 );
                                                        const browser_system3 = JSON.stringify(browser_system2);
                                                        world.setDynamicProperty('performance',browser_system3)
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a広告を削除しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                    })
                                        
                                break;
                                case 13:
                                    var trouble_list = world.getDynamicProperty('trouble_list')
                                            if(trouble_list==undefined){
                                                var trouble_list_system2=[]
                                            }else{
                                            var trouble_list_system2 = JSON.parse(trouble_list);
                                            }
                                            if(trouble_list_system2[0]==undefined){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(通報/報告)§r] §a通報内容が見つかりませんでした"}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                return
                                            }
                                    var form = new ActionFormData();
                                    var hackList1 = [ "チートの使用", "破壊行為", "妨害行為", "ハラスメント","その他"]
                                    form.title("HARUPhone1");
                                    form.body("通報報告の確認");
                                    for (let i = 0; i < trouble_list_system2.length; i++){
                                        form.button(`§l${trouble_list_system2[i][0]}\n§r${hackList1[trouble_list_system2[i][1]]}`);
                                    }
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body(`§l通報内容の詳細\n§rゲーマータグ:§e${trouble_list_system2[response][0]}\n§r内容:§e${hackList1[trouble_list_system2[response][1]]}\n§r詳細:§e${trouble_list_system2[response][2]}\n§r通報者:§a${trouble_list_system2[response][3]}`);
                                                form.button('対応完了')
                                                form.button('閉じる')
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response1 = r.selection;
                                                    switch (response1) {
                                                        case 0:
                                                            trouble_list_system2.splice( response , 1 )
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(通報/報告)§r] §a対応完了しました"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                            const trouble_list_system3 = JSON.stringify(trouble_list_system2);
                                                            world.setDynamicProperty('trouble_list',trouble_list_system3)
                                                        break;
                                                        case 1:
                                                            
                                                        break;
                                                    }
                                                })
                                            })
                                break;
                                case 14:
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("情報を選択");
                                    form.button("§5換金ログ");
                                    form.button("§9購入ログ");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                                var kannkin_log = world.getDynamicProperty('kannkin_log')
                                                if(kannkin_log==undefined){
                                                    var kannkin_log_system2=[]
                                                }else{
                                                var kannkin_log_system2 = JSON.parse(kannkin_log);
                                                }
                                                if(kannkin_log_system2[0]==undefined){
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a換金取引ログがありません"}]}`)
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                    return;
                                                }
                                                var kannkin_information = world.getDynamicProperty('kannkin_information')
                                                if(kannkin_information==undefined){
                                                    var kannkin_information_system2=[]
                                                }else{
                                                var kannkin_information_system2 = JSON.parse(kannkin_information);
                                                }
                                                if(kannkin_information_system2[0]==undefined){
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a換金できるアイテムがありません"}]}`)
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                    return;
                                                }
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body(`§5換金ログ\n§e-----------\n§b[ログ]`);
                                                for (let i = 0; i < kannkin_information_system2.length; i++){
                                                    form.button(`${kannkin_information_system2[i][0]} 1個/§b${kannkin_information_system2[i][1]}§r`,`textures/${kannkin_information_system2[i][3]}`);
                                                }
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body(`§b${kannkin_information_system2[response][0]}\n§r1個/§b${kannkin_information_system2[response][1]}\n§e-----------\n§a換金取引数§r:§b${kannkin_log_system2[response]}`);
                                                    form.button(`閉じる`);
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        
                                                    })
                                                })
                                            break;
                                            case 1:
                                                var kounyuu_log = world.getDynamicProperty('kounyuu_log')
                                                if(kounyuu_log==undefined){
                                                    var kounyuu_log_system2=[]
                                                }else{
                                                var kounyuu_log_system2 = JSON.parse(kounyuu_log);
                                                }
                                                if(kounyuu_log_system2[0]==undefined){
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a換金取引ログがありません"}]}`)
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                    return;
                                                }
                                                var kounyuu_information = world.getDynamicProperty('kounyuu_list')
                                                if(kounyuu_information==undefined){
                                                    var kounyuu_information_system2=[]
                                                }else{
                                                var kounyuu_information_system2 = JSON.parse(kounyuu_information);
                                                }
                                                if(kounyuu_information_system2[0]==undefined){
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a換金できるアイテムがありません"}]}`)
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                    return;
                                                }
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body(`§5換金ログ\n§e-----------\n§b[ログ]`);
                                                for (let i = 0; i < kounyuu_information_system2.length; i++){
                                                    form.button(`${kounyuu_information_system2[i][0]} 1個/§b${kounyuu_information_system2[i][1]}§r`,`textures/${kounyuu_information_system2[i][3]}`);
                                                }
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body(`§b${kounyuu_information_system2[response][0]}\n§r1個/§b${kounyuu_information_system2[response][1]}\n§e-----------\n§a購入取引数§r:§b${kounyuu_log_system2[response]}`);
                                                    form.button(`閉じる`);
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        
                                                    })
                                                })
                                            break;
                                        }
                                    })
                                break;
                                default:
                            }
                        }).catch(e => {
                            console.error(e, e.stack);
                        });
                    break;
                    case 17:
                        //管理者専門画面
                        var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body(`§5Operator Controller\n§a管理者HARUPAY残高§r:§e${world.getDynamicProperty('harupay_op_money')}\n§e--------------\n`);
                        form.button("§1ログ");
                        form.button("§5データ編集");
                        form.button("§2データ権限削除");
                        form.button("§9セキュリティー");
                        form.button("§4トラブルシューティング");
                        form.button("§1機能利用金額のカスタマイズ");
                        form.button("§3その他");
                        form.button("§9管理者版HARUPAY");
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response = r.selection;
                            switch (response) {
                                case 0:
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("§5ログを選択");
                                    form.button("§1HARUPAY/Quick");
                                    form.button("§5換金/購入");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                                var  harupay_logs_list = '';
                                                for (let i = 0; i < harupay_logs.length; i++){
                                                    harupay_logs_list = harupay_logs_list+`${harupay_logs[i]}\n`
                                                }
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body(`HARUPAYlog\n${harupay_logs_list}`);
                                                form.button("§0閉じる");
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    switch (response) {
                                                        case 0:
                                                        break;
                                                        default: break;
                                                    }
                                                })
                                            break;
                                            case 1:
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("情報を選択");
                                                form.button("§5換金ログ");
                                                form.button("§9購入ログ");
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    switch (response) {
                                                        case 0:
                                                            var kannkin_log = world.getDynamicProperty('kannkin_log')
                                                            if(kannkin_log==undefined){
                                                                var kannkin_log_system2=[]
                                                            }else{
                                                            var kannkin_log_system2 = JSON.parse(kannkin_log);
                                                            }
                                                            if(kannkin_log_system2[0]==undefined){
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a換金取引ログがありません"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                return;
                                                            }
                                                            var kannkin_information = world.getDynamicProperty('kannkin_information')
                                                            if(kannkin_information==undefined){
                                                                var kannkin_information_system2=[]
                                                            }else{
                                                            var kannkin_information_system2 = JSON.parse(kannkin_information);
                                                            }
                                                            if(kannkin_information_system2[0]==undefined){
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a換金できるアイテムがありません"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                return;
                                                            }
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body(`§5換金ログ\n§e-----------\n§b[ログ]`);
                                                            for (let i = 0; i < kannkin_information_system2.length; i++){
                                                                form.button(`${kannkin_information_system2[i][0]} 1個/§b${kannkin_information_system2[i][1]}§r`,`textures/${kannkin_information_system2[i][3]}`);
                                                            }
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                var form = new ActionFormData();
                                                                form.title("HARUPhone1");
                                                                form.body(`§b${kannkin_information_system2[response][0]}\n§r1個/§b${kannkin_information_system2[response][1]}\n§e-----------\n§a換金取引数§r:§b${kannkin_log_system2[response]}`);
                                                                form.button(`閉じる`);
                                                                form.show(player).then(r => {
                                                                    if (r.canceled) return;
                                                                    let response = r.selection;
                                                                    
                                                                })
                                                            })
                                                        break;
                                                        case 1:
                                                            var kounyuu_log = world.getDynamicProperty('kounyuu_log')
                                                            if(kounyuu_log==undefined){
                                                                var kounyuu_log_system2=[]
                                                            }else{
                                                            var kounyuu_log_system2 = JSON.parse(kounyuu_log);
                                                            }
                                                            if(kounyuu_log_system2[0]==undefined){
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a換金取引ログがありません"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                return;
                                                            }
                                                            var kounyuu_information = world.getDynamicProperty('kounyuu_list')
                                                            if(kounyuu_information==undefined){
                                                                var kounyuu_information_system2=[]
                                                            }else{
                                                            var kounyuu_information_system2 = JSON.parse(kounyuu_information);
                                                            }
                                                            if(kounyuu_information_system2[0]==undefined){
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a換金できるアイテムがありません"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                return;
                                                            }
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body(`§5換金ログ\n§e-----------\n§b[ログ]`);
                                                            for (let i = 0; i < kounyuu_information_system2.length; i++){
                                                                form.button(`${kounyuu_information_system2[i][0]} 1個/§b${kounyuu_information_system2[i][1]}§r`,`textures/${kounyuu_information_system2[i][3]}`);
                                                            }
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                var form = new ActionFormData();
                                                                form.title("HARUPhone1");
                                                                form.body(`§b${kounyuu_information_system2[response][0]}\n§r1個/§b${kounyuu_information_system2[response][1]}\n§e-----------\n§a購入取引数§r:§b${kounyuu_log_system2[response]}`);
                                                                form.button(`閉じる`);
                                                                form.show(player).then(r => {
                                                                    if (r.canceled) return;
                                                                    let response = r.selection;
                                                                    
                                                                })
                                                            })
                                                        break;
                                                    }
                                                })
                                            break;
                                        }
                                    })
                                break;
                                case 1:
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("データ編集する項目を選択");
                                    form.button("§5換金データ編集");
                                    form.button("§9購入データ編集");
                                    form.button("§4Quick相場情報の編集");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("機能を選択");
                                                form.button("§l追加");
                                                form.button("§l編集");
                                                form.button("§l削除");
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    switch (response) {
                                                        case 0:
                                                            var form = new ModalFormData();
                                                            form.textField("アイテム名", "ダイアモンド")
                                                            form.textField("アイテム換金金額", "0") 
                                                            form.textField("アイテムID", "diamond")
                                                            form.textField("アイコンパス(任意)", "items/diamond")
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                var kannkin_information = world.getDynamicProperty('kannkin_information')
                                                                if(kannkin_information==undefined){
                                                                    var kannkin_information_system2=[]
                                                                }else{
                                                                var kannkin_information_system2 = JSON.parse(kannkin_information);
                                                                }
                                                                kannkin_information_system2.push([r.formValues[0],r.formValues[1],r.formValues[2],r.formValues[3]])
                                                                const kannkin_information_system3 = JSON.stringify(kannkin_information_system2);
                                                                world.setDynamicProperty('kannkin_information',kannkin_information_system3)
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a追加しました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                var kannkin_log = world.getDynamicProperty('kannkin_log')
                                                                if(kannkin_log==undefined){
                                                                    var kannkin_log_system2=[]
                                                                }else{
                                                                var kannkin_log_system2 = JSON.parse(kannkin_log);
                                                                }
                                                                kannkin_log_system2.push(0)
                                                                const kannkin_log_system3 = JSON.stringify(kannkin_log_system2);
                                                                world.setDynamicProperty('kannkin_log',kannkin_log_system3)
                                                            })
                                                        break;
                                                        case 1:
                                                            var kannkin_information = world.getDynamicProperty('kannkin_information')
                                                                if(kannkin_information==undefined){
                                                                    var kannkin_information_system2=[]
                                                                }else{
                                                                var kannkin_information_system2 = JSON.parse(kannkin_information);
                                                                }
                                                                if(kannkin_information_system2[0]==undefined){
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a編集できるアイテムがありません"}]}`)
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                    return;
                                                                }
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body("編集する換金アイテム/ブロックを選択");
                                                            for (let i = 0; i < kannkin_information_system2.length; i++){
                                                                form.button(`${kannkin_information_system2[i][0]}:${kannkin_information_system2[i][1]}`);
                                                            }
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                var form = new ModalFormData();
                                                                form.textField("アイテム名", `${kannkin_information_system2[response][0]}`)
                                                                form.textField("アイテム金額", `${kannkin_information_system2[response][1]}`) 
                                                                form.textField("アイテムID", `${kannkin_information_system2[response][2]}`)
                                                                form.textField("アイコンパス(任意)", `${kannkin_information_system2[response][3]}`) 
                                                                form.show(player).then(r => {
                                                                    if (r.canceled) return;
                                                                    if(r.formValues[0]!=''){kannkin_information_system2[response][0]=r.formValues[0]}
                                                                    if(r.formValues[1]!=''){kannkin_information_system2[response][1]=r.formValues[1]}
                                                                    if(r.formValues[2]!=''){kannkin_information_system2[response][2]=r.formValues[2]}
                                                                    if(r.formValues[3]!=''){kannkin_information_system2[response][3]=r.formValues[3]}
                                                                    const kannkin_information_system3 = JSON.stringify(kannkin_information_system2);
                                                                    world.setDynamicProperty('kannkin_information',kannkin_information_system3)
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a編集しました"}]}`)
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                })
                                                            })
                                                        break;
                                                        case 2:
                                                            var kannkin_information = world.getDynamicProperty('kannkin_information')
                                                                if(kannkin_information==undefined){
                                                                    var kannkin_information_system2=[]
                                                                }else{
                                                                var kannkin_information_system2 = JSON.parse(kannkin_information);
                                                                }
                                                                if(kannkin_information_system2[0]==undefined){
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a削除できるアイテムがありません"}]}`)
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                    return;
                                                                }
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body("削除する換金アイテム/ブロックを選択");
                                                            for (let i = 0; i < kannkin_information_system2.length; i++){
                                                                form.button(`${kannkin_information_system2[i][0]}:${kannkin_information_system2[i][1]}`);
                                                            }
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                kannkin_information_system2.splice( response, 1 );
                                                                if(kannkin_information_system2==[]){
                                                                    kannkin_information_system2=undefined
                                                                }
                                                                const kannkin_information_system3 = JSON.stringify(kannkin_information_system2);
                                                                world.setDynamicProperty('kannkin_information',kannkin_information_system3)
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(換金)§r] §a削除しました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                var kannkin_log = world.getDynamicProperty('kannkin_log')
                                                                if(kannkin_log==undefined){
                                                                    var kannkin_log_system2=[]
                                                                }else{
                                                                var kannkin_log_system2 = JSON.parse(kannkin_log);
                                                                }
                                                                kannkin_log_system2.splice( response, 1 );
                                                                const kannkin_log_system3 = JSON.stringify(kannkin_log_system2);
                                                                world.setDynamicProperty('kannkin_log',kannkin_log_system3)
                                                            })
                                                        break;
                                                    }
                                                })          
                                            break;
                                            case 1:
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("編集項目を選択...");
                                                form.button("§l追加");
                                                form.button("§l編集");
                                                form.button("§l削除");
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    switch (response) {
                                                        case 0:
                                                            var form = new ModalFormData();
                                                            form.textField("アイテム名", "ダイアモンド")
                                                            form.textField("アイテム金額", "0") 
                                                            form.textField("アイテムID", "diamond")
                                                            form.textField("アイコンパス(任意)", "items/diamond")
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                var kounyuu_list = world.getDynamicProperty('kounyuu_list')
                                                                if(kounyuu_list==undefined){
                                                                    var kounyuu_list_system2=[]
                                                                }else{
                                                                var kounyuu_list_system2 = JSON.parse(kounyuu_list);
                                                                }
                                                                kounyuu_list_system2.push([r.formValues[0],r.formValues[1],r.formValues[2],r.formValues[3]])
                                                                const kounyuu_list_system3 = JSON.stringify(kounyuu_list_system2);
                                                                world.setDynamicProperty('kounyuu_list',kounyuu_list_system3)
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a追加しました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                var kounyuu_log = world.getDynamicProperty('kounyuu_log')
                                                                if(kounyuu_log==undefined){
                                                                    var kounyuu_log_system2=[]
                                                                }else{
                                                                var kounyuu_log_system2 = JSON.parse(kounyuu_log);
                                                                }
                                                                kounyuu_log_system2.push(0)
                                                                const kounyuu_log_system3 = JSON.stringify(kounyuu_log_system2);
                                                                world.setDynamicProperty('kounyuu_log',kounyuu_log_system3)
                                                            })
                                                        break;
                                                        case 1:
                                                            var kounyuu_list = world.getDynamicProperty('kounyuu_list')
                                                                if(kounyuu_list==undefined){
                                                                    var kounyuu_list_system2=[]
                                                                }else{
                                                                var kounyuu_list_system2 = JSON.parse(kounyuu_list);
                                                                }
                                                                if(kounyuu_list_system2[0]==undefined){
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a編集できるアイテムがありません"}]}`)
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                    return;
                                                                }
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body("編集するアイテム/ブロックを選択");
                                                            for (let i = 0; i < kounyuu_list_system2.length; i++){
                                                                form.button(`${kounyuu_list_system2[i][0]} 1個/§b${kounyuu_list_system2[i][1]}§r`,`textures/${kounyuu_list_system2[i][3]}`);
                                                            }
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                var form = new ModalFormData();
                                                                form.textField("アイテム名", `${kounyuu_list_system2[response][0]}`)
                                                                form.textField("アイテム金額", `${kounyuu_list_system2[response][1]}`) 
                                                                form.textField("アイテムID", `${kounyuu_list_system2[response][2]}`)
                                                                form.textField("アイコンパス(任意)", `${kounyuu_list_system2[response][3]}`)
                                                                form.show(player).then(r => {
                                                                    if (r.canceled) return;
                                                                    if(r.formValues[0]!=''){kounyuu_list_system2[response][0]=r.formValues[0]}
                                                                    if(r.formValues[1]!=''){kounyuu_list_system2[response][1]=r.formValues[1]}
                                                                    if(r.formValues[2]!=''){kounyuu_list_system2[response][2]=r.formValues[2]}
                                                                    if(r.formValues[3]!=''){kounyuu_list_system2[response][3]=r.formValues[3]}
                                                                    const kounyuu_list_system3 = JSON.stringify(kounyuu_list_system2);
                                                                    world.setDynamicProperty('kounyuu_list',kounyuu_list_system3)
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a編集しました"}]}`)
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                })
                                                            })
                                                        break;
                                                        case 2:
                                                            var kounyuu_list = world.getDynamicProperty('kounyuu_list')
                                                                if(kounyuu_list==undefined){
                                                                    var kounyuu_list_system2=[]
                                                                }else{
                                                                var kounyuu_list_system2 = JSON.parse(kounyuu_list);
                                                                }
                                                                if(kounyuu_list_system2[0]==undefined){
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a削除できるアイテムがありません"}]}`)
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                    return;
                                                                }
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body("削除するアイテム/ブロックを選択");
                                                            for (let i = 0; i < kounyuu_list_system2.length; i++){
                                                                form.button(`${kounyuu_list_system2[i][0]} 1個/§b${kounyuu_list_system2[i][1]}§r`,`textures/${kounyuu_list_system2[i][3]}`);
                                                            }
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                kounyuu_list_system2.splice( response, 1 );
                                                                if(kounyuu_list_system2==[]){
                                                                    kounyuu_list_system2=undefined
                                                                }
                                                                const kounyuu_list_system3 = JSON.stringify(kounyuu_list_system2);
                                                                world.setDynamicProperty('kounyuu_list',kounyuu_list_system3)
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(購入)§r] §a削除しました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                            })
                                                        break;
                                                    }
                                                })        
                                            break;
                                            case 2:
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("機能を選択");
                                                form.button("§l追加");
                                                form.button("§l編集");
                                                form.button("§l削除");
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    switch (response) {
                                                        case 0:
                                                            var form = new ModalFormData();
                                                            form.textField("アイテム名", "ダイアモンドなど")
                                                            form.textField("アイテム金額", "0") 
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                var quick_information = world.getDynamicProperty('quick_information')
                                                                if(quick_information==undefined){
                                                                    var quick_information_system2=[]
                                                                }else{
                                                                var quick_information_system2 = JSON.parse(quick_information);
                                                                }
                                                                quick_information_system2.push([r.formValues[0],r.formValues[1]])
                                                                const quick_information_system3 = JSON.stringify(quick_information_system2);
                                                                world.setDynamicProperty('quick_information',quick_information_system3)
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(情報)§r] §a追加しました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                            })
                                                        break;
                                                        case 1:
                                                            var quick_information = world.getDynamicProperty('quick_information')
                                                                if(quick_information==undefined){
                                                                    var quick_information_system2=[]
                                                                }else{
                                                                var quick_information_system2 = JSON.parse(quick_information);
                                                                }
                                                                if(quick_information_system2[0]==undefined){
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(情報)§r] §a編集できるアイテムがありません"}]}`)
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                    return;
                                                                }
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body("編集する情報を選択");
                                                            for (let i = 0; i < quick_information_system2.length; i++){
                                                                form.button(`${quick_information_system2[i][0]}:${quick_information_system2[i][1]}`);
                                                            }
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                var form = new ModalFormData();
                                                                form.textField("アイテム名", `${quick_information_system2[response][0]}`)
                                                                form.textField("アイテム金額", `${quick_information_system2[response][1]}`) 
                                                                form.show(player).then(r => {
                                                                    if (r.canceled) return;
                                                                    if(r.formValues[0]!=''){quick_information_system2[response][0]=r.formValues[0]}
                                                                    if(r.formValues[1]!=''){quick_information_system2[response][1]=r.formValues[1]}
                                                                    const quick_information_system3 = JSON.stringify(quick_information_system2);
                                                                    world.setDynamicProperty('quick_information',quick_information_system3)
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(情報)§r] §a編集しました"}]}`)
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                })
                                                            })
                                                        break;
                                                        case 2:
                                                            var quick_information = world.getDynamicProperty('quick_information')
                                                                if(quick_information==undefined){
                                                                    var quick_information_system2=[]
                                                                }else{
                                                                var quick_information_system2 = JSON.parse(quick_information);
                                                                }
                                                                if(quick_information_system2[0]==undefined){
                                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(情報)§r] §a削除できるアイテムがありません"}]}`)
                                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                                    return;
                                                                }
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body("削除する情報を選択");
                                                            for (let i = 0; i < quick_information_system2.length; i++){
                                                                form.button(`${quick_information_system2[i][0]}:${quick_information_system2[i][1]}`);
                                                            }
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                quick_information_system2.splice( response, 1 );
                                                                if(quick_information_system2==[]){
                                                                    quick_information_system2=undefined
                                                                }
                                                                const quick_information_system3 = JSON.stringify(quick_information_system2);
                                                                world.setDynamicProperty('quick_information',quick_information_system3)
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(情報)§r] §a削除しました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                            })
                                                        break;
                                                    }
                                                })  
                                            break;
                                        }
                                    })
                                break;
                                case 2:
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("権限削除する項目を選択");
                                    form.button("Quick出品アイテムの削除");
                                    form.button("§2仕事依頼の削除");
                                    form.button("§5ブラウザページの削除");
                                    form.button("§1広告ページの削除");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                                if(shop_menu[0]==undefined){
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §aデータがありません"}]}`) 
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                  return
                                                }
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("shop_menuデータ");
                                                for (let i = 0; i < shop_menu.length; i++){
                                                    form.button(`§l${shop_menu[i][0]}\n§r額:§b${shop_menu[i][2]}§rPAY  出品者:§2${shop_menu[i][1]}`);
                                                }
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §a${shop_menu[response]}を削除しました"}]}`) 
                                                    shop_menu.splice( response, 1 );
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                }
                                                )
                                            break;
                                            case 1:
                                                if(quest[0]==undefined){
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §aデータがありません"}]}`) 
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                  return
                                                }
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("shop_menuデータ");
                                                for (let i = 0; i < quest.length; i++){
                                                    form.button(`§l${quest[i][0]}\n§r報酬額:§b${quest[i][2]}§rPAY  依頼者:§2${quest[i][3]}`);
                                                }
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §a${quest[response]}を削除しました"}]}`) 
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                    quest.splice( response, 1 );
                                                }
                                                )
                                            break;
                                            case 2:
                                                var browser = world.getDynamicProperty('browser')
                                                        if(browser==undefined){
                                                            var browser_system2=[]
                                                        }else{
                                                        var browser_system2 = JSON.parse(browser);
                                                        }
                                                        if(browser_system2[0]==undefined){
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a削除できるページがありません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            return;
                                                        }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("削除するページを選択");
                                                    for (let i = 0; i < browser_system2.length; i++){
                                                        form.button(`§l${browser_system2[i][2]}\n§r${browser_system2[i][3]}`);
                                                    }
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        browser_system2.splice( response , 1 );
                                                        const browser_system3 = JSON.stringify(browser_system2);
                                                        world.setDynamicProperty('browser',browser_system3)
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §aページを削除しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                    })
                                            break;
                                            case 3:
                                                var browser = world.getDynamicProperty('performance')
                                                        if(browser==undefined){
                                                            var browser_system2=[]
                                                        }else{
                                                        var browser_system2 = JSON.parse(browser);
                                                        }
                                                        if(browser_system2[0]==undefined){
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a削除できる広告がありません"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                            return;
                                                        }
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body("削除するページを選択");
                                                    for (let i = 0; i < browser_system2.length; i++){
                                                        form.button(`§l${browser_system2[i][2]}\n§r${browser_system2[i][3]}`);
                                                    }
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response = r.selection;
                                                        browser_system2.splice( response , 1 );
                                                        const browser_system3 = JSON.stringify(browser_system2);
                                                        world.setDynamicProperty('performance',browser_system3)
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a広告を削除しました"}]}`)
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                    })
                                            break;
                                        }
                                    })
                                break;
                                case 3:
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("セキュリティー機能を選択");
                                    form.button("§4通報/報告確認");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                                var trouble_list = world.getDynamicProperty('trouble_list')
                                                if(trouble_list==undefined){
                                                    var trouble_list_system2=[]
                                                }else{
                                                var trouble_list_system2 = JSON.parse(trouble_list);
                                                }
                                                if(trouble_list_system2[0]==undefined){
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(通報/報告)§r] §a通報内容が見つかりませんでした"}]}`)
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                    return
                                                }
                                        var form = new ActionFormData();
                                        var hackList1 = [ "チートの使用", "破壊行為", "妨害行為", "ハラスメント","その他"]
                                        form.title("HARUPhone1");
                                        form.body("通報報告の確認");
                                        for (let i = 0; i < trouble_list_system2.length; i++){
                                            form.button(`§l${trouble_list_system2[i][0]}\n§r${hackList1[trouble_list_system2[i][1]]}`);
                                        }
                                        form.show(player).then(r => {
                                            if (r.canceled) return;
                                            let response = r.selection;
                                                    var form = new ActionFormData();
                                                    form.title("HARUPhone1");
                                                    form.body(`§l通報内容の詳細\n§rゲーマータグ:§e${trouble_list_system2[response][0]}\n§r内容:§e${hackList1[trouble_list_system2[response][1]]}\n§r詳細:§e${trouble_list_system2[response][2]}\n§r通報者:§a${trouble_list_system2[response][3]}`);
                                                    form.button('対応完了')
                                                    form.button('閉じる')
                                                    form.show(player).then(r => {
                                                        if (r.canceled) return;
                                                        let response1 = r.selection;
                                                        switch (response1) {
                                                            case 0:
                                                                trouble_list_system2.splice( response , 1 )
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(通報/報告)§r] §a対応完了しました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                                const trouble_list_system3 = JSON.stringify(trouble_list_system2);
                                                                world.setDynamicProperty('trouble_list',trouble_list_system3)
                                                            break;
                                                            case 1:
                                                                
                                                            break;
                                                        }
                                                    })
                                                })
                                            break;
                                        }
                                    })                               
                                break;
                                case 4:
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("トラブルシューティング機能を選択");
                                    form.button("§2キャッシュデーターの削除");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                              //キャッシュデータの削除
                                                cashdataA(player);//レジ関連
                                                cashdataB(player);//HARUPhone関連
                                                cashdataC(player);//HARUPhone関連
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §aキャッシュデータを削除しました"}]}`) 
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)    
                                            break;
                                        }
                                    })
                                break;         
                                case 5:
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("カスタマイズする機能を選択");
                                    form.button("§2ブラウザ関連");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("設定を選択...");
                                                form.button("§rページ投稿金額設定");
                                                form.button("§r広告化金額設定");
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    switch (response) {
                                                        case 0:
                                                            var form = new ModalFormData();
                                                            form.textField("ページ投稿金額(半角数字)", `${world.getDynamicProperty('browser_newpage_money')}`)
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                world.setDynamicProperty('browser_newpage_money',r.formValues[0])
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §aページ投稿金額を設定しました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                            })
                                                        break;
                                                        case 1:
                                                            var form = new ModalFormData();
                                                            form.textField("広告化金額(半角数字)", `${world.getDynamicProperty('browser_performance_money')}`)
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                world.setDynamicProperty('browser_performance_money',r.formValues[0])
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(browser)§r] §a広告化金額を設定しました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                            })
                                                        break;
                                                    }
                                                }) 
                                            break;
                                        }
                                    })
                                break;
                                case 6:
                                    var form = new ActionFormData();
                                    form.title("HARUPhone1");
                                    form.body("設定する項目を選択");
                                    form.button("§d初期金額の再設定");
                                    form.button("§1新規プレイヤーにスマホ/マネー付与");
                                    form.button("§3自動付与システム");
                                    form.button("§5街(村)代表権限の付与/剥奪");
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        let response = r.selection;
                                        switch (response) {
                                            case 0:
                                                world.setDynamicProperty('op_fast', undefined)
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §a初期金額設定をリセットしました.§5スマホを開くと再設定できます."}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                            break;
                                            case 1:
                                                var players = world.getAllPlayers()
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("新規プレイヤーにスマホ/Money付与");
                                                for (let i = 0; i < players.length; i++){
                                                 form.button(`${players[i].name}`)   
                                                }
                                                form.show(player).then(r => {
                                                    let response = r.selection;
                                                    if (r.canceled) {
                                                        return;
                                                    }
                                                    var partner1 = players[response];
                                                    if(partner1.hasTag('HARUPAY_Member')){
                                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §4このPlayerは付与済みです"}]}`) 
                                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                        return;
                                                    }
                                                    partner1.runCommand("give @s additem:haruphone1");
                                                    partner1.runCommand(`scoreboard players add @s money ${world.getDynamicProperty('start_money')}`);
                                                    partner1.runCommand(`scoreboard players add @s account 0`);
                                                    partner1.runCommand("tag @s add HARUPAY_Member")
                                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §eこのPlayerに付与しました"}]}`)
                                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                              })
                                            break;
                                            case 2:
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("設定を選択...");
                                                form.button("§lオン");
                                                form.button("§lオフ");
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    switch (response) {
                                                        case 0:
                                                            world.setDynamicProperty('money_start_system2',0)
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §aオンにしました"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        break;
                                                        case 1:
                                                            world.setDynamicProperty('money_start_system2',1)
                                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §aオフにしました"}]}`)
                                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                        break;
                                                    }
                                                })
                                            break;
                                            case 3:
                                                var form = new ActionFormData();
                                                form.title("HARUPhone1");
                                                form.body("街代表権限の操作");
                                                form.button("付与");
                                                form.button("剥奪");
                                                form.show(player).then(r => {
                                                    if (r.canceled) return;
                                                    let response = r.selection;
                                                    switch (response) {
                                                        case 0:
                                                            var players = world.getAllPlayers()
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body("権限を付与するプレイヤーを選択");
                                                            for (let i = 0; i < players.length; i++){
                                                                form.button(`${players[i].name}`);
                                                            }
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                player.runCommand(`tag @a[name="${players[response].name}"] add City_Representative_Authority_Tag`)
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §a${players[response].name}§rに街代表権限を付与しました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                            })
                                                        break;
                                                        case 1:
                                                            var players = world.getAllPlayers()
                                                            var form = new ActionFormData();
                                                            form.title("HARUPhone1");
                                                            form.body("権限を剥奪するプレイヤーを選択");
                                                            for (let i = 0; i < players.length; i++){
                                                                form.button(`${players[i].name}`);
                                                            }
                                                            form.show(player).then(r => {
                                                                if (r.canceled) return;
                                                                let response = r.selection;
                                                                player.runCommand(`tag @a[name="${players[response].name}"] remove City_Representative_Authority_Tag`)
                                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(設定)§r] §a${players[response].name}§rに街代表権限を剥奪しました"}]}`)
                                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                                            })
                                                        break;
                                                    }
                                                })
                                                
                                            break;
                                        }
                                    })
                                break;   
                                case 7:
                        //HARUPAY画面
                        var form = new ActionFormData();
                        form.title("HARUPhone1");
                        form.body("管理者版HARU PAY");
                        form.button("§2§l残高の確認");
                        form.button("§6§l送る");
                        form.button("§e§lチャージ");
                        form.button("§e§lMyHARUPAYでチャージ");
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response = r.selection;
                            switch (response) {
                                case 0:
                                    //HARUPAYの残高の確認
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§a管理者§fのHARUPAY所持金:§l§b${world.getDynamicProperty('harupay_op_money')}"}]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                break;
                                case 1:
                                    //サーバーが混みあった際の不具合防止
                                    if(selection_HARUPAYSend_import==1){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§eただいまサーバーが混みあっております.しばらくしてからもう一度お試しください"}]}`) 
                                        return;
                                    }
                                        var players = world.getAllPlayers()
                                        selection_HARUPAYSend_import = 1;
                                    //サーバー使用中の設定   
                                    //全プレイヤー取得
                                    //HARIPAY送信画面
                                    form = new ActionFormData();
                                    form.body("送り先のプレイヤーを選択");
                                    for (let i = 0; i < players.length; i++){
                                        form.button(`${players[i].name}`);
                                    }
                                    form.show(player).then(r => {
                                        if (r.canceled) {
                                            selection_HARUPAYSend_import = 0;
                                            return;
                                        };
                                        let response = r.selection;
                                        //playerの残高の取得
                                        const score = Number(world.getDynamicProperty('harupay_op_money'))
                                        //送信先プレイヤーの設定
                                        let partner = players[response].name
                                        //送金額設定画面
                                        var form = new ModalFormData();
                                        form.textField("送金額(半角数字)", "0")
                                        form.show(player).then(r => {
                                            if (r.canceled) {
                                                selection_HARUPAYSend_import = 0;
                                                return;
                                            };
                                            if(isNaN(r.formValues[0])){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §4半角数字で入力してください"}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                selection_HARUPAYSend_import = 0;
                                                return;
                                            }
                                            if (r.formValues[0]>100000000){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §4設定した金額は上限をオーバーしています.1億以下で設定してください"}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                selection_HARUPAYSend_import = 0;
                                                return;
                                            }
                                            if (r.formValues[0]<0){
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §40以下は設定できません"}]}`)
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                                selection_HARUPAYSend_import = 0;
                                                return;
                                            }
                                            var selection_score_harupay = 0;
                                            if(r.formValues[0]=='') {selection_score_harupay=0}else{
                                                selection_score_harupay=r.formValues[0]
                                            }
                                            //残高不足時メッセージ
                                            player.runCommand(`tellraw @a[name="${player.name}", scores={money=..${selection_score_harupay-1}}] {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §eHARUPAY残高が不足しています"}]}`)
                                            player.runCommand(`playsound random.toast @a[name="${player.name}", scores={money=..${selection_score_harupay-1}}] ~ ~ ~ 1.0 0.4 0.7`)
                                            //残高が設定金額以上の場合のみ実行
                                            if(score >= selection_score_harupay){
                                                player.runCommand(`scoreboard players add @a[name="${partner}"] money ${selection_score_harupay}`)  
                                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §b${partner}へ送信されました"}]}`) 
                                                player.runCommand(`tellraw @a[name="${partner}"] {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §b管理者マネーから${selection_score_harupay}PAY受け取りました"}]}`) 
                                                player.runCommand(`playsound random.toast @a[name="${partner}"] ~ ~ ~ 1.0 1.7 1.0`)  
                                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 1.0`)  
                                                world.setDynamicProperty('harupay_op_money',Number(world.getDynamicProperty('harupay_op_money'))-Number(selection_score_harupay))
                                                const timer = new Date();
                                                harupay_logs[harupay_logs.length]=`[${timer.getHours()}:${timer.getMinutes()}]管理者が${partner}へ${selection_score_harupay}PAY送信`
                                             }
                                             selection_HARUPAYSend_import = 0;
                                        })
                                    })
                                break;
                                case 2:
                                    //HAURPAYチャージ画面
                                    var form = new ModalFormData();
                                    form.textField("チャージ金額(半角数字)", "0") 
                                    form.show(player).then(r => {
                                        if (r.canceled) {
                                            return;
                                        };
                                        if(isNaN(r.formValues[0])){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §4半角数字で入力してください"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        if (r.formValues[0]<0){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §40以下は設定できません"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        var selection_score_charge = 0
                                        if(r.formValues[0]=='') {selection_score_charge=0}else{
                                            selection_score_charge=r.formValues[0]
                                         }
                                        player.runCommand(`tellraw @s[hasitem={item=additem:hyoutaroucoin,quantity=..${(selection_score_charge / 100)-1}}] {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §4コインが不足しています"}]}`)
                                        player.runCommand(`tag @s[hasitem={item=additem:hyoutaroucoin,quantity=${selection_score_charge / 100}..}] add harupaymoneysystem2`)
                                        if(player.hasTag('harupaymoneysystem2')){
                                            world.setDynamicProperty('harupay_op_money',Number(world.getDynamicProperty('harupay_op_money'))+Number(selection_score_charge))
                                            player.runCommand(`tellraw @s[hasitem={item=additem:hyoutaroucoin,quantity=${selection_score_charge / 100}..}] {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §3${selection_score_charge}PAYチャージしました"}]}`)
                                        }
                                        player.runCommand(`playsound random.toast @s[hasitem={item=additem:hyoutaroucoin,quantity=${selection_score_charge / 100}..}] ~ ~ ~ 1.0 1.7 1.0`)
                                        player.runCommand(`playsound random.toast @s[hasitem={item=additem:hyoutaroucoin,quantity=..${(selection_score_charge / 100)-1}}] ~ ~ ~ 1.0 0.4 0.7`)
                                        player.runCommand(`clear @s[hasitem={item=additem:hyoutaroucoin,quantity=${selection_score_charge / 100}..}] additem:hyoutaroucoin 0 ${selection_score_charge / 100}`)
                                        player.runCommand(`tag @s remove harupaymoneysystem2`)
                                    })
                                break;
                                case 3:
                                    var selection_score_harupay = 0;
                                    //送金額設定画面
                                    var form = new ModalFormData();
                                    form.textField("送金額(半角数字)", "0")
                                    form.show(player).then(r => {
                                        if (r.canceled) {
                                            return;
                                        };
                                        if(isNaN(r.formValues[0])){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §4半角数字で入力してください"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        if (r.formValues[0]>100000000){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §4設定した金額は上限をオーバーしています.1億以下で設定してください"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        if (r.formValues[0]<0){
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §40以下は設定できません"}]}`)
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                            return;
                                        }
                                        if(r.formValues[0]=='') {selection_score_harupay=0}else{
                                            selection_score_harupay=r.formValues[0]
                                        }
                                        const score = world.scoreboard.getObjective("money").getScore(player.scoreboardIdentity);
                                        var harupay_op_money1 = Number(world.getDynamicProperty('harupay_op_money'));
                                        //残高が設定金額以上の場合のみ実行
                                        if(score >= selection_score_harupay){
                                            player.runCommand(`scoreboard players remove @s money ${selection_score_harupay}`)  
                                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(管理者版HARUPAY)§r] §b管理者マネーへ送信されました"}]}`) 
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 1.0`)  
                                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 1.0`)  
                                            world.setDynamicProperty('harupay_op_money',Number(harupay_op_money1+Number(selection_score_harupay)))
                                         }
                                    })
                                break;
                                default:
                            }
                        })
                                break;
                                default:
                            }
                        }).catch(e => {
                            console.error(e, e.stack);
                        });
                    break;
                    default:
                }
            })
        }
    }
    //実行アイテム=additem:advance
    if (eventData.itemStack.typeId === "additem:advance"){
        const player = eventData.source;
        if(!player.hasTag('advance_member')){
            var form = new ActionFormData();
            form.title("Advance");
            form.body(`サービスを選択してください`);
            form.button(`§9Advanceアカウント作成`);
            form.button(`§2Advanceアカウントにログイン`);
            form.show(player).then(r => {
                if (r.canceled) return;
                let response = r.selection;
                switch (response) {
                    case 0:
                        var form = new ModalFormData();
                        form.title("Advance");
                        form.textField("会社名(店名)", ``)
                        form.textField("会社(店)の詳細", ``)
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            if(r.formValues[0]==''){
                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §4入力されていない項目があります"}]}`)
                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                return;
                            }
                            var advance_member = world.getDynamicProperty('advance_member')
                            if(advance_member==undefined){
                                var advance_member_system2=[]
                            }else{
                            var advance_member_system2 = JSON.parse(advance_member);
                            }
                            for (let i = 0; i < advance_member_system2.length; i++){
                                if(advance_member_system2[i][1]==r.formValues[0]){
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §4この会社名は既に使われています"}]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                    return;
                                }
                            }
                            advance_member_system2.push([player.name,r.formValues[0],r.formValues[1],0,[]])
                            const advance_member_system3 = JSON.stringify(advance_member_system2);
                            world.setDynamicProperty('advance_member',advance_member_system3)
                            player.setDynamicProperty('advance_member_data',r.formValues[0])
                            player.runCommand('tag @s add advance_member')
                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §aアカウントを作成しました"}]}`)
                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                        })
                    break;
                    case 1:
                        var advance_member = world.getDynamicProperty('advance_member')
                            if(advance_member==undefined){
                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §4ログインできるアカウントがありません"}]}`)
                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                return;
                            }else{
                            var advance_member_system2 = JSON.parse(advance_member);
                            }
                            var advance_member_system3 = []
                            var advance_member_cash1 = 0
                            var form = new ActionFormData();
                            form.title("Advance");
                            form.body(`アカウントを選択してください`);
                            for (let i = 0; i < advance_member_system2.length; i++){
                                if(advance_member_system2[i][0]==player.name){
                                    form.button(`${advance_member_system2[i][1]}`);
                                    advance_member_system3.push(i)
                                    advance_member_cash1 = 1
                                }
                            }
                            if(advance_member_cash1 == 0){
                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §4ログインできるアカウントがありません"}]}`)
                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                return;
                            }
                            form.show(player).then(r => {
                                if (r.canceled) return;
                                let response = r.selection;
                                player.setDynamicProperty('advance_member_data',advance_member_system2[advance_member_system3[response]][1])
                                player.runCommand('tag @s add advance_member')
                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §aログインしました"}]}`)
                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                            })
                    break;
                }
            })  
        }else{
            var advance_member_data = player.getDynamicProperty('advance_member_data')
            var advance_member = world.getDynamicProperty('advance_member')
            var advance_member_system2 = JSON.parse(advance_member);
            for (let i = 0; i < advance_member_system2.length; i++){
                if(advance_member_system2[i][1]==advance_member_data){
                    var advance_id = i
                }
            }
        var form = new ActionFormData();
        form.title("Advance");
        form.body(`§r会社名(店名):§b${advance_member_system2[advance_id][1]}\n§r資産:§a${advance_member_system2[advance_id][3]}\n§e-------------\n§b[アプリ一覧]`);
        form.button(`§4ログアウト`);
        form.button(`§9配送完了設定`);
        form.button(`§2資産からHARUPAYに送信`);
        form.button(`§3商品の追加/編集/削除`);
        form.show(player).then(r => {
            if (r.canceled) return;
            let response = r.selection;
            switch (response) {
                case 0:
                    player.runCommand('tag @s remove advance_member')
                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §aログアウトしました"}]}`)
                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                break;
                case 1:
                    var advance_member_data = player.getDynamicProperty('advance_member_data')
                    var advance_shop = world.getDynamicProperty('advance_shop')
                    var advance_id = -1;
                    if(advance_shop==undefined){
                        var advance_shop_system2=[]
                    }else{
                    var advance_shop_system2 = JSON.parse(advance_shop);
                    }
                    for (let i = 0; i < advance_shop_system2.length; i++){
                        if(advance_shop_system2[i][0]==advance_member_data){
                            advance_id = i
                        }
                    }
                    if(advance_id == -1){
                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §4配送未完了の商品がありません"}]}`)
                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                        return;
                    }
                    var advance_id_cash = [];
                    var advance_id_cash1 = [];
                    var advance_id_cash2 = [];
                    var advance_id_cash3 = 0;
                    
                    var form = new ActionFormData();
                    form.title("Advance");
                    form.body(`配送完了した商品を選択`);
                    for (let i = 0; i < advance_shop_system2[advance_id][1].length; i++){
                        for (let i1 = 0; i1 < advance_shop_system2[advance_id][1][i][3].length; i1++){
                        if(advance_shop_system2[advance_id][1][i][3][i1][2]!=1&&advance_id_cash2.includes(advance_shop_system2[advance_id][1][i][0])==false){
                         form.button(`§l${advance_shop_system2[advance_id][1][i][0]}`);
                         advance_id_cash.push(i)
                         advance_id_cash2.push(advance_shop_system2[advance_id][1][i][0])
                        }
                       } 
                    }
                    if(advance_id_cash[0]==undefined){
                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §4配送未完了の商品がありません"}]}`)
                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                        return;
                    }
                    form.show(player).then(r => {
                        if (r.canceled) return;
                        let response = r.selection;
                        var form = new ActionFormData();
                        form.title("Advance");
                        form.body(`§b${advance_shop_system2[advance_id][1][advance_id_cash[response]][0]}§rで配送完了した商品を選択`);
                        for (let i = 0; i < advance_shop_system2[advance_id][1][advance_id_cash[response]][3].length; i++){
                            if(advance_shop_system2[advance_id][1][advance_id_cash[response]][3][i][2]==0){
                            form.button(`§r個数:§2${advance_shop_system2[advance_id][1][advance_id_cash[response]][3][i][1]}  §r配送先:§9${advance_shop_system2[advance_id][1][advance_id_cash[response]][3][i][0]}`);
                            advance_id_cash1.push(i)
                        }
                        }
                        form.show(player).then(r => {
                            if (r.canceled) return;
                            let response1 = r.selection;
                            advance_shop_system2[advance_id][1][advance_id_cash[response]][3][advance_id_cash1[response1]][2]=1
                            const advance_shop_system3 = JSON.stringify(advance_shop_system2);
                            world.setDynamicProperty('advance_shop',advance_shop_system3)
                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §a配送を完了しました"}]}`)
                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                        })
                    })
                break;
                case 2:
                    var advance_member_data = player.getDynamicProperty('advance_member_data')
                    var advance_member = world.getDynamicProperty('advance_member')
                    var advance_member_system2 = JSON.parse(advance_member);
                    for (let i = 0; i < advance_member_system2.length; i++){
                        if(advance_member_system2[i][1]==advance_member_data){
                            var advance_id = i
                        }
                    }
                    //サーバーが混みあった際の不具合防止
                    if(selection_HARUPAYSend_import==1){
                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§eただいまサーバーが混みあっております.しばらくしてからもう一度お試しください"}]}`) 
                        return;
                    }
                        var players = world.getAllPlayers()
                        selection_HARUPAYSend_import = 1;
                    //サーバー使用中の設定   
                    //全プレイヤー取得
                    //HARIPAY送信画面
                    form = new ActionFormData();
                    form.body("送り先のプレイヤーを選択");
                    for (let i = 0; i < players.length; i++){
                        form.button(`${players[i].name}`);
                    }
                    form.show(player).then(r => {
                        if (r.canceled) {
                            selection_HARUPAYSend_import = 0;
                            return;
                        };
                        let response = r.selection;
                        //送信先プレイヤーの設定
                        let partner = players[response].name
                        //送金額設定画面
                        form = new ModalFormData();
                        form.textField("送金額(半角数字)", "0")
                        form.show(player).then(r => {
                            if (r.canceled) {
                                selection_HARUPAYSend_import = 0;
                                return;
                            };
                            if(isNaN(r.formValues[0])){
                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §4半角数字で入力してください"}]}`)
                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                selection_HARUPAYSend_import = 0;
                                return;
                            }
                            if (r.formValues[0]>100000000){
                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §4設定した金額は上限をオーバーしています.1億以下で設定してください"}]}`)
                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                selection_HARUPAYSend_import = 0;
                                return;
                            }
                            if (r.formValues[0]<0){
                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §40以下は設定できません"}]}`)
                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                selection_HARUPAYSend_import = 0;
                                return;
                            }
                            var selection_score_harupay = 0;
                            if(r.formValues[0]=='') {selection_score_harupay=0}else{
                                selection_score_harupay=r.formValues[0]
                            }
                            //残高が設定金額以上の場合のみ実行
                            if(advance_member_system2[advance_id][3] >= selection_score_harupay){
                                player.runCommand(`scoreboard players add @a[name="${partner}"] money ${selection_score_harupay}`)  
                                player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §b${partner}へ送信されました"}]}`) 
                                player.runCommand(`tellraw @a[name="${partner}"] {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §b${player.name}から${selection_score_harupay}PAY受け取りました"}]}`) 
                                player.runCommand(`playsound random.toast @a[name="${partner}"] ~ ~ ~ 1.0 1.7 1.0`)  
                                player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 1.0`)  
                                advance_member_system2[advance_id][3]=advance_member_system2[advance_id][3]-selection_score_harupay
                                const timer = new Date();
                                harupay_logs[harupay_logs.length]=`[${timer.getHours()}:${timer.getMinutes()}]${player.name}が${partner}へ${selection_score_harupay}PAY送信`
                                const advance_member_system3 = JSON.stringify(advance_member_system2);
                                world.setDynamicProperty('advance_member',advance_member_system3)
                             }else{
                                 //残高不足時メッセージ
                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §e資産が不足しています"}]}`)
                            player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                             }
                             selection_HARUPAYSend_import = 0;
                        })
                    })
                break;
                case 3:
                    var form = new ActionFormData();
                    form.title("Advance");
                    form.body("選択してください");
                    form.button("§l追加");
                    form.button("§l編集");
                    form.button("§l削除");
                    form.show(player).then(r => {
                        if (r.canceled) return;
                        let response = r.selection;
                        switch (response) {
                            case 0:
                                var form = new ModalFormData();
                                form.title("Advance");
                                form.textField("商品名", "ダイアモンド")
                                form.textField("金額", "0") 
                                form.textField("在庫数", "0") 
                                form.show(player).then(r => {
                                    if (r.canceled) return;
                                    var advance_shop = world.getDynamicProperty('advance_shop')
                                    if(advance_shop==undefined){
                                        var advance_shop_system2=[]
                                    }else{
                                    var advance_shop_system2 = JSON.parse(advance_shop);
                                    }
                                    var advance_shop_cash = 0
                                    for (let i = 0; i < advance_shop_system2.length; i++){
                                        if(advance_shop_system2[i][0]==player.getDynamicProperty('advance_member_data')){
                                            advance_shop_cash = 1
                                            advance_shop_system2[i][1].push([r.formValues[0],r.formValues[1],r.formValues[2],[]])
                                        }
                                    }
                                    if(advance_shop_cash==0){
                                        advance_shop_system2.push([player.getDynamicProperty('advance_member_data'),[[r.formValues[0],r.formValues[1],r.formValues[2],[],0]]])
                                    }
                                    const advance_shop_system3 = JSON.stringify(advance_shop_system2);
                                    world.setDynamicProperty('advance_shop',advance_shop_system3)
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §a追加しました"}]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                })
                            break;
                            case 1:
                                var advance_shop = world.getDynamicProperty('advance_shop')
                                    if(advance_shop==undefined){
                                        var advance_shop_system2=[]
                                    }else{
                                    var advance_shop_system2 = JSON.parse(advance_shop);
                                    }
                                var advance_shop_cash = [[],[]]
                                var form = new ActionFormData();
                                form.title("Advance");
                                form.body("編集するアイテム/ブロックを選択");
                                for (let i = 0; i < advance_shop_system2.length; i++){
                                    for (let i1 = 0; i1 < advance_shop_system2[i][1].length; i1++){
                                    if(advance_shop_system2[i][0]==player.getDynamicProperty('advance_member_data')){
                                    form.button(`${advance_shop_system2[i][1][i1][0]}\n金額:§b${advance_shop_system2[i][1][i1][1]}§r`);
                                    advance_shop_cash[0].push(i)
                                    advance_shop_cash[1].push(i1)
                                    }
                                }
                                }
                                if(advance_shop_cash[0][0]==undefined){
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §4編集可能な商品がありません"}]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                    return;
                                }
                                form.show(player).then(r => {
                                    if (r.canceled) return;
                                    let response = r.selection;
                                    var form = new ModalFormData();
                                    form.textField("商品名", `${advance_shop_system2[advance_shop_cash[0][response]][1][advance_shop_cash[1][response]][0]}`)
                                    form.textField("金額", `${advance_shop_system2[advance_shop_cash[0][response]][1][advance_shop_cash[1][response]][1]}`) 
                                    form.textField("在庫数", `${advance_shop_system2[advance_shop_cash[0][response]][1][advance_shop_cash[1][response]][2]}`)
                                    form.show(player).then(r => {
                                        if (r.canceled) return;
                                        if(r.formValues[0]!=''){advance_shop_system2[advance_shop_cash[0][response]][1][advance_shop_cash[1][response]][0]=r.formValues[0]}
                                        if(r.formValues[1]!=''){advance_shop_system2[advance_shop_cash[0][response]][1][advance_shop_cash[1][response]][1]=r.formValues[1]}
                                        if(r.formValues[2]!=''){advance_shop_system2[advance_shop_cash[0][response]][1][advance_shop_cash[1][response]][2]=r.formValues[2]}
                                        const advance_shop_system3 = JSON.stringify(advance_shop_system2);
                                        world.setDynamicProperty('advance_shop',advance_shop_system3)
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §a編集しました"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                    })
                                })
                            break;
                            case 2:
                                var advance_shop = world.getDynamicProperty('advance_shop')
                                    if(advance_shop==undefined){
                                        var advance_shop_system2=[]
                                    }else{
                                    var advance_shop_system2 = JSON.parse(advance_shop);
                                    }
                                var advance_shop_cash = [[],[]]
                                var form = new ActionFormData();
                                form.title("Advance");
                                form.body("削除する商品を選択");
                                for (let i = 0; i < advance_shop_system2.length; i++){
                                    if(advance_shop_system2[i][0]==player.getDynamicProperty('advance_member_data')){
                                    for (let i1 = 0; i1 < advance_shop_system2[i][1].length; i1++){
                                    form.button(`${advance_shop_system2[i][1][i1][0]}\n金額:§b${advance_shop_system2[i][1][i1][1]}§r`);
                                    advance_shop_cash[0].push(i)
                                    advance_shop_cash[1].push(i1)
                                    }
                                }
                                }
                                if(advance_shop_cash[0][0]==undefined){
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §4削除可能な商品がありません"}]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                    return;
                                }
                                form.show(player).then(r => {
                                    if (r.canceled) return;
                                    let response = r.selection;
                                    for (let i = 0; i < advance_shop_system2[advance_shop_cash[0][response]][1][advance_shop_cash[1][response]][3].length; i++){
                                    if(advance_shop_system2[advance_shop_cash[0][response]][1][advance_shop_cash[1][response]][3][i][2]!=1){
                                        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(Advance)§r] §4選択した商品の配送がすべて完了していません"}]}`)
                                        player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 0.4 0.7`)
                                        return;
                                    }
                                   }
                                        // advance_shop_system2.push([player.getDynamicProperty('advance_member_data'),[[r.formValues[0],r.formValues[1],r.formValues[2],[],0]]])
                                    advance_shop_system2[advance_shop_cash[0][response]][1].splice(advance_shop_cash[1][response], 1 );
                                    if(advance_shop_system2[advance_shop_cash[0][response]][1][advance_shop_cash[1][0]]==undefined){
                                        advance_shop_system2.splice(advance_shop_cash[0][response], 1 )
                                    }
                                    const advance_shop_system3 = JSON.stringify(advance_shop_system2);
                                    world.setDynamicProperty('advance_shop',advance_shop_system3)
                                    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r[§a通知§7(advance)§r] §a削除しました"}]}`)
                                    player.runCommand(`playsound random.toast @s ~ ~ ~ 1.0 1.7 0.5`)
                                })
                            break;
                        }
                    })
                    
                break;
            }
        })
    }
    }
    })
}
