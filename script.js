(function () {
    'use strict';


    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const appContainer = $('#app-container');
    const mainContent = $('#main-content');
    const bottomNav = $('#bottom-nav');
    const modalOverlay = $('#modal-overlay');
    const modalContentWrapper = $('#modal-content-wrapper');
    const clickEffectLayer = $('#click-effect-layer');


    const pages = {
        messages: $('#page-messages'),
        contacts: $('#page-contacts'),
        discover: $('#page-discover'),
        moments: $('#page-moments'),
        tutorial: $('#page-tutorial'),
        settings: $('#page-settings'),
        'theme-settings': $('#page-theme-settings'),
        chat: $('#page-chat'),
        prompts: $('#page-prompts'),
    };


    const chatTitle = $('#chat-title');
    const chatTypingIndicator = $('#chat-typing-indicator');
    const chatArea = $('#chat-area');
    const aiRequestBtn = $('#ai-request-btn');
    const messageInput = $('#message-input');
    const sendBtn = $('#send-btn');
    const chatBackBtn = $('#chat-back-btn');

    const emojiBtn = $('#emoji-btn');
    const voiceBtn = $('#voice-btn');
    const emojiCard = $('#emoji-card');
    const emojiGrid = $('#emoji-grid');
    const quotePreviewArea = $('#quote-preview-area');
    const quotePreviewContent = $('#quote-preview-content');
    const cancelQuoteBtn = $('#cancel-quote-btn');
    const favoriteEmojiBtn = $('#favorite-emoji-btn');
    const favoriteEmojiCard = $('#favorite-emoji-card');
    const favoriteEmojiGrid = $('#favorite-emoji-grid');
    const chatInputArea = $('#chat-input-area');

    const appState = {
        currentPage: 'messages',
        currentChatId: null,
        currentCircleId: null,
        momentsLastRefresh: 0,
        theme: 'neumorphic',
        contactsSortOrder: 'asc',
        groupsSortOrder: 'asc',
        quotingMessage: null,
        longPressTimer: null,
        cardCoverLibrary: [
            'https://z.wiki/u/fHMKzJ',
            'https://z.wiki/u/hmSAIR',
            'https://z.wiki/u/YWUcea',
            'https://z.wiki/u/dDuLcP',
            'https://z.wiki/u/JQtgF6',
            'https://z.wiki/u/bVpr6w',
            'https://z.wiki/u/dVvZ7t'
        ],
        emojiCurrentPage: 0,
        emojisPerPage: 8,
        favoriteEmojis: [],
        favoriteEmojiCurrentPage: 0,
        aiEmojiMap: {
            'iazCCF': '谁在喊本大王',
            'xPHzNC': '尊嘟假嘟',
            '7kVeZJ': '我操',
            'pCQgk2': '老子生气了',
            'IUg8vO': '吃瓜群众',
            'Il6dL9': '对不起',
            'vjEl6R': '花花送你',
            'werDxS': '抱抱我',
            'Ms5AEa': '委屈(可爱)',
            'QX7VnJ': '安慰',
            'nHcfqI': '卖萌(可爱)',
            'oztxES': '比心(可爱)',
            'GOl2dp': '请和我约会',
            'BuD0Gy': '你是狗',
            'jcisbx': '我只是一只狗',
            'Zo82H7': '每天都想你(卖萌)',
            'CcIWXl': '假装无辜(可爱)',
            'zSBHMm': '肯定(可爱)',
            'CIWud3': '谁愿意收留我(可爱)',
            'HOAcPN': '谄媚(可爱)',
            'GP1VJ3': '家里交给我吧(可爱)',
            'BISbnP': '泪了',
            'asnj6B': '试探(可爱)',
            'htNZls': '懂得都懂',
            '2q5VbM': '就你小子是吧(嚣张)',
            'sd0yQX': '放心交给我，我会搞砸的(沙雕)',
            'E0PrxD': '皇帝驾到(沙雕)',
            '7vgm7D': '皇帝驾崩(沙雕)',
            'lPgzpQ': '诛你九族(龙图)',
            'j2d9di': '骂朕，满门抄斩！',
            'hKyKwP': '奴才谢主隆恩(龙图)',
            'IkZP8N': '我饿了',
            'osIpSG': '怎么不回我消息',
            'IgfF9w': '快理我(委屈可爱)',
            'wb63Ag': '等下讲你你又不高兴(吐槽)',
            '8CCMsJ': '我靠，你爱不爱我',
            '34LcOG': '指指点点',
            'hDpVH8': '我吗？(懵逼)',
            '1RcY8W': '注意你的态度',
            '6cIfGp': '急得蹬腿',
            'm1zzxd': '不想活了(沙雕)',
            'YqlPWK': '你和我这个神经病计较什么',
            'LokqQT': '你很牛吗？',
            'qHSXVP': '妈的，被看扁了',
            'CUOA6Y': '令人火大',
            '3jc0XI': '不想活了(可爱)',
            'qZxeWV': '你快哄我(可爱)',
            '3iYdgX': '我被哄好了(可爱)',
            'ZNzgpY': '你就是很好很好(可爱)',
            'PCLA8G': '我好想你吖(委屈可爱)',
            'i0UYTS': '你瞧不起我(委屈)',
            'VWwt5c': '我想要这个(可爱)',
            'SIWqFT': '得意',
            'ff8JWS': '我萎了',
            'oiMaM6': '你精神正常吗',
            'LIQKcy': '想死',
            'EhcgEa': '被看穿了',
            'vnDXiy': '怎么你要打死我吗(犯贱)',
            '71bINa': '你少看扁我(自嘲熊)',
            'gcubY9': 'tui(吐口水)',
            'r1lada': '你太粘人了_把你拿去粘老鼠',
            'y6ldmK': '很不高兴为你服务',
            'yrVneI': '真贱啊',
            'dP6HDY': '你自首吧',
            'jjyR6G': '你是猪',
            'WfSWCe': '你他妈谁啊',
            'B0S4LA': '蒙圈'
        },
        playerEmojiMap: {
            'iazCCF': '谁在喊本大王',
            'xPHzNC': '尊嘟假嘟',
            '7kVeZJ': '我操',
            'pCQgk2': '老子生气了',
            'IUg8vO': '吃瓜群众',
            'Il6dL9': '对不起',
            'vjEl6R': '花花送你',
            'werDxS': '抱抱我',
            'Ms5AEa': '委屈(可爱)',
            'QX7VnJ': '安慰',
            'nHcfqI': '卖萌(可爱)',
            'oztxES': '比心(可爱)',
            'GOl2dp': '请和我约会',
            'BuD0Gy': '你是狗',
            'jcisbx': '我只是一只狗',
            'Zo82H7': '每天都想你(卖萌)',
            'CcIWXl': '假装无辜(可爱)',
            'zSBHMm': '肯定(可爱)',
            'CIWud3': '谁愿意收留我(可爱)',
            'HOAcPN': '谄媚(可爱)',
            'GP1VJ3': '家里交给我吧(可爱)',
            'BISbnP': '泪了',
            'asnj6B': '试探(可爱)',
            'htNZls': '懂得都懂',
            '2q5VbM': '就你小子是吧(嚣张)',
            'sd0yQX': '放心交给我，我会搞砸的(沙雕)',
            'E0PrxD': '皇帝驾到(沙雕)',
            '7vgm7D': '皇帝驾崩(沙雕)',
            'lPgzpQ': '诛你九族(龙图)',
            'j2d9di': '骂朕，满门抄斩！',
            'hKyKwP': '奴才谢主隆恩(龙图)',
            'IkZP8N': '我有点饿了',
            'osIpSG': '怎么不回我消息',
            'Lt1f9K': '特别特别饿',
            'IgfF9w': '快理我(委屈)',
            'wb63Ag': '等下讲你你又不高兴(吐槽)',
            's9xWmu': '你是个坏东西',
            '8CCMsJ': '我靠，你爱不爱我',
            '34LcOG': '指指点点',
            'hDpVH8': '我吗？(懵逼)',
            '1RcY8W': '注意你的态度',
            '6cIfGp': '急得蹬腿',
            'kRdQhe': '偷听',
            '3jc0XI': '不想活了(可爱)',
            'm1zzxd': '不想活了(沙雕)',
            'YqlPWK': '你和我这个神经病计较什么',
            'LokqQT': '你很牛吗？',
            '4ZkXRx': '他们都欺负我',
            'qZxeWV': '你快哄我',
            '3iYdgX': '我被哄好了(可爱)',
            'qHSXVP': '妈的，被看扁了',
            '278MJW': '不努力就会成为女人的玩物',
            'mzqDku': '我喜欢你(害羞)',
            'dnzCAP': '什么都想和你说',
            'ZNzgpY': '你就是很好很好(可爱)',
            'PCLA8G': '我好想你吖(委屈)',
            'sf7Egt': '我去洗澡啦(可爱)',
            'i0UYTS': '你瞧不起我(委屈)',
            'VWwt5c': '我想要这个',
            'hMTJRH': '和你贴贴',
            'CUOA6Y': '令人火大',
            'Y06FYQ': '我是小孩，让我(可爱)',
            'lFpXLU': '再叫剪了你的小鸡鸡',
            'RaogpF': '没办法人家就是好色嘛',
            '7a48eQ': '你怎么鸡8小小的，说话吊吊的',
            'N3ZzUs': '拿来吧你',
            'oGFqYZ': '出来亲嘴',
            'Z3glHK': '停止思考',
            '9RWtTB': '你人真好，都想和你谈恋爱了',
            'KNRPfQ': '没人爱我(杰瑞猫表情)',
            'bpyimG': '起了杀心',
            'DOwyrR': '给你点了(赞同,抽象)',
            'fd1o0q': '我是国家一级保护废物(猫咪葛优瘫)',
            '0liCnk': '中(肯定的意思)',
            'wTC4Ha': '完力(完了)',
            'n0Ll5b': '无力',
            'SIWqFT': '得意',
            '2up6Um': '嘎嘎大笑',
            'tLsCTf': '不许笑了',
            'ff8JWS': '我萎了',
            'oiMaM6': '你精神正常吗',
            'LIQKcy': '想死',
            'EhcgEa': '被看穿了',
            'vnDXiy': '怎么你要打死我吗(犯贱)',
            '71bINa': '你少看扁我(自嘲熊)',
            'eDzCRs': '疑惑',
            'gcubY9': 'tui(吐口水)',
            'r1lada': '你太粘人了_把你拿去粘老鼠',
            'y6ldmK': '很不高兴为你服务',
            'yrVneI': '真贱啊',
            'dP6HDY': '你自首吧',
            'OFcKsy': '勾引我是吧',
            'jjyR6G': '你是猪',
            'WfSWCe': '你他妈谁啊',
            'ZbqhUq': '已读不回',
            'B0S4LA': '蒙圈',
            '3sp60p': '不做评价(龙图)',
            'VIbUBK': '你是少爷吗',
            'RjmyAc': '下线了兄弟萌(们)',
            'y2w7BR': '一边去(龙图)',
            'fyYVhV': '糟糕的话无需再说(抽象)',
            'PT4fq1': '在干嘛_呼吸也要和我说一声啊',
            'wBBj7q': '老子惹你没',
            '3Yb2hM': '资本你赢了',
            '9K6IPq': '脑子有问题',
            'jHsXmD': '我们不要学他',
            'khoGur': '刚睡醒(自嘲熊)',
            '0svPHM': '想哭(自嘲熊)',
            '39cQOS': '嘻嘻(自嘲熊)',
            '4wZWjY': '尴尬一笑(黄豆)',
            'YaiPfJ': '我超_什么寄吧',
            'mxDIwM': '欺负没力气的我你开心吗',
            'HIRelu': '多找找你自己的原因',
            'RNgGNY': '以后不会和你分享了(委屈)',
            'GWn8O2': '嘬嘬嘬',
            'SwNPaw': '你们好会装逼啊',
            'tDB1Sp': '复婚好吗，孩子总哭',
            'mWU2m4': '你活这么久，和我睡两天怎么了',
            'YCRn9a': '我坏，她好，行了吧',
            't7vGt6': '当我意识到生活的缩写是SM，我的痛苦就全说得清了',
            '5AaDlW': '本来挺想你的_后来玩手机忘了',
            'a2gifR': '偷偷谈恋爱没事_别偷偷发财好吗',
            'BI9YDr': '荒唐',
            'ScbsVz': '我要报警',
            'yVU6HV': '有趣，草了',
            'WRy68R': '低声些_难道光彩吗',
            'vHBtBv': '偏不睡(抽象表情)',
            'IvfqD7': '装可怜(抽象)',
            'E7e2MS': '够了(抽象)',
            'OWcn1K': '假装懂了',
            'pk06Iq': '你是坏狗(可爱)'
        },
        currentChat: {
            allMessages: [],
            renderedCount: 0,
        },
        messagesPerLoad: 20,
        isHistoryLoading: false,
    };


    const DBHelper = {
        DB_NAME: 'AIChatRoomDB',
        DB_VERSION: 1,
        db: null,

        async init() {

            this.DB_VERSION = 10;

            return new Promise((resolve, reject) => {
                if (this.db) {
                    return resolve(this.db);
                }
                const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

                request.onerror = (event) => {
                    console.error("数据库打开失败", event);
                    reject("数据库打开失败");
                };

                request.onsuccess = (event) => {
                    this.db = event.target.result;
                    console.log("数据库打开成功");
                    resolve(this.db);
                };

                request.onupgradeneeded = (event) => {
                    console.log("数据库升级中...");
                    const db = event.target.result;
                    const transaction = event.target.transaction;


                    if (!db.objectStoreNames.contains('profile')) {
                        db.createObjectStore('profile', { keyPath: 'id' });
                    }
                    if (!db.objectStoreNames.contains('contacts')) {
                        const store = db.createObjectStore('contacts', { keyPath: 'id' });
                        store.createIndex('name', 'name', { unique: true });
                        store.createIndex('createdAt', 'createdAt', { unique: false });
                    }
                    if (!db.objectStoreNames.contains('groups')) {
                        const store = db.createObjectStore('groups', { keyPath: 'id' });
                        store.createIndex('createdAt', 'createdAt', { unique: false });
                    }
                    if (!db.objectStoreNames.contains('chats')) {
                        db.createObjectStore('chats', { keyPath: 'chatId' });
                    }
                    if (!db.objectStoreNames.contains('apiConfig')) {
                        db.createObjectStore('apiConfig', { keyPath: 'id' });
                    }

                    if (!db.objectStoreNames.contains('openingScenes')) {
                        const store = db.createObjectStore('openingScenes', { keyPath: 'id' });
                        store.createIndex('groupId', 'groupId', { unique: false });
                        store.createIndex('contactId', 'contactId', { unique: false });
                    } else {

                        const store = transaction.objectStore('openingScenes');
                        if (!store.indexNames.contains('contactId')) {
                            store.createIndex('contactId', 'contactId', { unique: false });
                            console.log("为 'openingScenes' 表添加 'contactId' 索引成功");
                        }
                    }


                    if (!db.objectStoreNames.contains('prompts')) {
                        const store = db.createObjectStore('prompts', { keyPath: 'id' });
                        store.createIndex('name', 'name', { unique: false });
                        store.createIndex('folderId', 'folderId', { unique: false });
                        console.log("创建 'prompts' 表成功");
                    }
                    if (!db.objectStoreNames.contains('promptFolders')) {
                        const store = db.createObjectStore('promptFolders', { keyPath: 'id' });
                        store.createIndex('name', 'name', { unique: true });
                        console.log("创建 'promptFolders' 表成功");
                    }
                    if (!db.objectStoreNames.contains('circles')) {
                        const store = db.createObjectStore('circles', { keyPath: 'id' });
                        store.createIndex('name', 'name', { unique: true });
                        console.log("创建 'circles' 表成功");
                    }
                    if (!db.objectStoreNames.contains('moments')) {
                        const store = db.createObjectStore('moments', { keyPath: 'id' });
                        store.createIndex('circleId', 'circleId', { unique: false });
                        store.createIndex('timestamp', 'timestamp', { unique: false });
                        console.log("创建 'moments' 表成功");
                    }

                    console.log("数据库升级完成");
                };
            });
        },


        async get(storeName, key) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([storeName], 'readonly');
                const store = transaction.objectStore(storeName);
                const request = store.get(key);
                request.onsuccess = () => resolve(request.result);
                request.onerror = (e) => reject(`Get error from ${storeName}: ${e.target.error}`);
            });
        },

        async getAll(storeName, indexName, sortOrder = 'next') {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([storeName], 'readonly');
                const store = transaction.objectStore(storeName);
                const index = indexName ? store.index(indexName) : store;
                const request = index.getAll();
                request.onsuccess = () => resolve(request.result);
                request.onerror = (e) => reject(`GetAll error from ${storeName}: ${e.target.error}`);
            });
        },

        async put(storeName, item) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                const request = store.put(item);
                request.onsuccess = () => resolve(request.result);
                request.onerror = (e) => reject(`Put error in ${storeName}: ${e.target.error}`);
            });
        },

        async delete(storeName, key) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                const request = store.delete(key);
                request.onsuccess = () => resolve();
                request.onerror = (e) => reject(`Delete error from ${storeName}: ${e.target.error}`);
            });
        },
    };


    const Utils = {
        generateId(prefix) {
            return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        },

        getRandomColor() {
            const colors = ['#F4E8DD', '#EDD4D8', '#CCD4CC', '#B5BFCF', '#E8A0BF'];
            return colors[Math.floor(Math.random() * colors.length)];
        },

        createAvatarDataUrl(color) {
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><rect width="50" height="50" fill="${color}"/></svg>`;
            return `data:image/svg+xml;base64,${btoa(svg)}`;
        },

        formatTimestampSmartly(timestamp) {
            const date = new Date(timestamp);
            const now = new Date();

            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const yesterdayStart = new Date(todayStart);
            yesterdayStart.setDate(yesterdayStart.getDate() - 1);

            const formatTime = (d) => d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

            if (date >= todayStart) {

                return formatTime(date);
            } else if (date >= yesterdayStart) {

                return `昨天 ${formatTime(date)}`;
            } else {

                return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }) + ' ' + formatTime(date);
            }
        },

        formatTimestampForPrompt(timestamp) {
            const d = new Date(timestamp);
            return `${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
        },

        compressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.7) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        let width = img.width;
                        let height = img.height;

                        if (width > height) {
                            if (width > maxWidth) {
                                height = Math.round(height * (maxWidth / width));
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width = Math.round(width * (maxHeight / height));
                                height = maxHeight;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);

                        resolve(canvas.toDataURL(file.type, quality));
                    };
                    img.onerror = reject;
                };
                reader.onerror = reject;
            });
        },

        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },

        parseMomentTimestamp(timeStr) {
            if (!timeStr) return Date.now();
            const now = new Date();
            const year = now.getFullYear();
            const [datePart, timePart] = timeStr.split(' ');
            if (!datePart || !timePart) return Date.now();

            const [month, day] = datePart.split('/');
            const [hour, minute] = timePart.split(':');


            const parsedDate = new Date(year, parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));


            if (parsedDate > now) {
                parsedDate.setFullYear(year - 1);
            }

            return parsedDate.getTime();
        }
    };


    const UIManager = {
        notificationQueue: [],
        isDisplayingNotification: false,
        async navigateTo(pageId, fromPage = null) {
            if (!pages[pageId]) return;


            if (['chat', 'prompts', 'moments', 'tutorial'].includes(pageId)) {
                bottomNav.style.display = 'none';
            } else {
                bottomNav.style.display = 'flex';
            }


            $$('#bottom-nav .nav-item').forEach(item => {
                item.classList.toggle('active', item.dataset.page === pageId);
            });


            Object.values(pages).forEach(page => page.classList.remove('active'));
            pages[pageId].classList.add('active');
            appState.currentPage = pageId;
            appState.fromPage = fromPage;


            switch (pageId) {
                case 'messages': await this.renderMessagesListPage(); break;
                case 'contacts': await this.renderContactsPage(); break;
                case 'discover': break;
                case 'moments': await this.renderMomentsPage(); break;
                case 'settings': break;
                case 'theme-settings': await EventManager.renderThemeSettingsPage(); break;
                case 'prompts': await EventManager.renderPromptsPage(); break;
            }
        },

        async renderMessagesListPage() {
            const messageListUl = $('#message-list-ul');
            messageListUl.innerHTML = '';
            const chats = await DBHelper.getAll('chats');
            const contacts = await DBHelper.getAll('contacts');
            const groups = await DBHelper.getAll('groups');
            const myProfile = await DBHelper.get('profile', 'myProfile');

            if (chats.length === 0) {
                messageListUl.innerHTML = `<li style="text-align:center; color: #aaa; padding: 40px 0;">还没有消息，快去通讯录找好友聊天吧~</li>`;
                return;
            }

            let combinedChats = [];

            for (const chat of chats) {
                if (!chat.history || chat.history.length === 0) continue;


                const displayableHistory = chat.history.filter(m => !['inner_voice', 'essay'].includes(m.segmentType));


                if (displayableHistory.length === 0) continue;

                const lastMessage = displayableHistory[displayableHistory.length - 1];


                let unreadCount = chat.history.filter(m => m.isUnread).length;

                let chatInfo = {
                    id: chat.chatId,
                    lastMessageContent: lastMessage.content,
                    lastMessageTimestamp: lastMessage.timestamp,
                    unreadCount: unreadCount,
                };

                let isGroupChat = false;

                if (chat.chatId.startsWith('contact-')) {
                    const contact = contacts.find(c => c.id === chat.chatId);
                    if (contact) {
                        chatInfo.name = contact.remark || contact.name;
                        chatInfo.avatar = contact.avatar;
                    } else continue;
                } else if (chat.chatId.startsWith('group-')) {
                    isGroupChat = true;
                    const group = groups.find(g => g.id === chat.chatId);
                    if (group) {
                        chatInfo.name = group.name;
                        chatInfo.avatar = group.avatar;
                    } else continue;
                }


                switch (lastMessage.segmentType) {
                    case 'emoji-image':

                        const emojiDesc = appState.playerEmojiMap[lastMessage.content];
                        chatInfo.lastMessageContent = emojiDesc ? `[表情] ${emojiDesc}` : '[未知表情]';
                        break;
                    case 'image_simulated':
                        chatInfo.lastMessageContent = '[图片]';
                        break;
                    case 'card':

                        if (lastMessage.cardData) {
                            chatInfo.lastMessageContent = `[${lastMessage.cardData.shareType} ${lastMessage.cardData.title}]`;
                        } else {
                            chatInfo.lastMessageContent = '[分享]';
                        }
                        break;
                    case 'voice':
                        chatInfo.lastMessageContent = '[语音]';
                        break;
                    case 'transfer':
                        chatInfo.lastMessageContent = '[转账]';
                        break;
                    case 'red-packet':
                        chatInfo.lastMessageContent = '[红包]';
                        break;
                    case 'moment_forward':
                        chatInfo.lastMessageContent = '[转发动态]';
                        break;

                }


                if (lastMessage.isRetracted) {
                    chatInfo.lastMessageContent = '[一条消息被撤回]';
                }



                if (isGroupChat && lastMessage.type === 'received') {
                    const sender = contacts.find(c => c.id === lastMessage.senderId);
                    if (sender) {
                        chatInfo.lastMessageContent = `${sender.remark || sender.name}: ${chatInfo.lastMessageContent}`;
                    }
                }

                combinedChats.push(chatInfo);
            }

            combinedChats.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);

            combinedChats.forEach(chat => {
                const li = document.createElement('li');
                li.className = 'message-item';
                li.dataset.chatId = chat.id;
                li.innerHTML = `
                        <img src="${chat.avatar}" alt="avatar" class="item-avatar">
                        <div class="item-content">
                            <div class="item-name">${chat.name}</div>
                            <div class="item-last-msg">${chat.lastMessageContent}</div>
                        </div>
                        <div class="item-info">
                            <div class="item-time">${Utils.formatTimestampSmartly(chat.lastMessageTimestamp)}</div>
                            ${chat.unreadCount > 0 ? `<div class="unread-badge">${chat.unreadCount}</div>` : ''}
                        </div>
                    `;
                li.addEventListener('click', () => this.openChat(chat.id));
                messageListUl.appendChild(li);
            });
        },

        async renderContactsPage(tab = 'friends') {
            $$('.tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
            $$('.contact-section').forEach(sec => sec.classList.toggle('active', sec.id.includes(tab)));

            if (tab === 'friends') {
                const friends = await DBHelper.getAll('contacts');
                friends.sort((a, b) => {
                    return appState.contactsSortOrder === 'asc'
                        ? a.createdAt - b.createdAt
                        : b.createdAt - a.createdAt;
                });
                this.renderContactList($('#friends-list-ul'), friends, 'contact');
            } else {
                const groups = await DBHelper.getAll('groups');
                groups.sort((a, b) => {
                    return appState.groupsSortOrder === 'asc'
                        ? a.createdAt - b.createdAt
                        : b.createdAt - a.createdAt;
                });
                this.renderContactList($('#groups-list-ul'), groups, 'group');
            }
        },

        renderContactList(ulElement, items, type) {
            ulElement.innerHTML = '';
            if (items.length === 0) {
                ulElement.innerHTML = `<li style="text-align:center; color: #aaa; padding: 40px 0;">空空如也~</li>`;
                return;
            }
            items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'contact-item';
                li.dataset.id = item.id;
                li.innerHTML = `
                        <img src="${item.avatar}" alt="avatar" class="contact-item-avatar">
                        <span class="contact-item-name">${type === 'contact' ? (item.remark || item.name) : item.name}</span>
                        ${type === 'contact'
                        ? `<i class="fas fa-info-circle contact-info-btn" data-id="${item.id}"></i>`
                        : `<i class="fas fa-ellipsis-h contact-info-btn" data-id="${item.id}"></i>`
                    }
                    `;

                li.addEventListener('click', (e) => {
                    if (e.target.classList.contains('contact-info-btn')) return;
                    this.openChat(item.id);
                });


                const infoBtn = li.querySelector('.contact-info-btn');
                if (infoBtn) {
                    infoBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (type === 'contact') {
                            this.showContactInfo(item.id);
                        } else {
                            this.showGroupInfo(item.id);
                        }
                    });
                }

                ulElement.appendChild(li);
            });
        },

        async openChat(chatId) {
            appState.currentChatId = chatId;
            const isGroup = chatId.startsWith('group-');
            let target;
            if (isGroup) {
                target = await DBHelper.get('groups', chatId);
            } else {
                target = await DBHelper.get('contacts', chatId);
            }

            if (!target) {
                this.showModal({
                    title: "错误",
                    body: `<p>找不到该聊天对象，可能已被删除。</p>`,
                    actions: [{ text: '好的', class: 'btn-primary', handler: () => this.hideModal() }]
                });
                return;
            }

            chatTitle.textContent = isGroup ? target.name : (target.remark || target.name);


            const chatData = await DBHelper.get('chats', chatId) || { chatId, history: [], lastAiReplyTimestamp: 0 };
            let madeChanges = false;
            chatData.history.forEach(msg => {
                if (msg.isUnread) {
                    msg.isUnread = false;
                    madeChanges = true;
                }
            });
            if (madeChanges) {
                await DBHelper.put('chats', chatData);
            }


            if (isGroup) {
                for (const memberId of target.members) {
                    const privateChat = await DBHelper.get('chats', memberId);
                    if (privateChat && privateChat.history) {
                        let privateChatMadeChanges = false;
                        privateChat.history.forEach(msg => {
                            if (msg.isUnread && msg.isPrivateInGroup) {
                                msg.isUnread = false;
                                privateChatMadeChanges = true;
                            }
                        });
                        if (privateChatMadeChanges) {
                            await DBHelper.put('chats', privateChat);
                        }
                    }
                }
            }


            await this.refreshChatView();
            this.navigateTo('chat');


            await UIManager.applyChatBackground(chatId);



            setTimeout(() => {
                chatArea.scrollTop = chatArea.scrollHeight;
            }, 50);


            const chatSettings = await DBHelper.get('apiConfig', 'chatSettings') || {};
            const intervalHours = chatSettings.activeReplyInterval || 3;
            const lastAiTimestamp = chatData.lastAiReplyTimestamp || 0;
            const now = Date.now();
            const elapsedHours = (now - lastAiTimestamp) / (1000 * 60 * 60);

            if (lastAiTimestamp > 0 && elapsedHours >= intervalHours) {
                console.log(`距离上次AI回复已过去 ${elapsedHours.toFixed(2)} 小时，已达到设定的 ${intervalHours} 小时，触发主动回复。`);

                setTimeout(() => {
                    AIHandler.handleActiveReplyRequest(lastAiTimestamp);
                }, 500);
            } else {
                if (lastAiTimestamp > 0) {
                    console.log(`距离上次AI回复已过去 ${elapsedHours.toFixed(2)} 小时，未达到设定的 ${intervalHours} 小时，不触发主动回复。`);
                } else {
                    console.log(`这是本会话第一次与AI交互或无历史记录，不触发主动回复。`);
                }
            }
        },

        async refreshChatView() {
            if (!appState.currentChatId) return;

            const chatData = await DBHelper.get('chats', appState.currentChatId);
            appState.currentChat.allMessages = chatData ? chatData.history : [];
            appState.currentChat.renderedCount = 0;

            chatArea.innerHTML = '';
            const loaderHTML = '<div id="history-loader"><div class="loader-spinner"></div></div>';
            chatArea.insertAdjacentHTML('beforeend', loaderHTML);

            await this.loadMoreMessages();

            setTimeout(() => {
                chatArea.scrollTop = chatArea.scrollHeight;
            }, 10);
        },

        async loadMoreMessages() {
            if (appState.isHistoryLoading) return;

            const { allMessages, renderedCount } = appState.currentChat;
            const loader = $('#history-loader');

            if (renderedCount >= allMessages.length) {
                if (loader) loader.remove();
                return;
            }

            appState.isHistoryLoading = true;
            if (loader) loader.classList.add('visible');


            await new Promise(resolve => setTimeout(resolve, 300));

            const startIndex = Math.max(0, allMessages.length - renderedCount - appState.messagesPerLoad);
            const endIndex = allMessages.length - renderedCount;
            const messagesToLoad = allMessages.slice(startIndex, endIndex);

            if (messagesToLoad.length === 0) {
                if (loader) loader.remove();
                appState.isHistoryLoading = false;
                return;
            }

            const fragment = document.createDocumentFragment();
            let lastTimestamp = (startIndex > 0) ? allMessages[startIndex - 1].timestamp : 0;
            const profile = await DBHelper.get('profile', 'myProfile');
            const contacts = await DBHelper.getAll('contacts');


            const absoluteLastMessage = allMessages.length > 0 ? allMessages[allMessages.length - 1] : null;

            for (const msg of messagesToLoad.reverse()) {
                if (['inner_voice', 'essay'].includes(msg.segmentType)) {
                    continue;
                }
                if (msg.isHidden) {
                    continue;
                }
                let messageElement;

                let senderInfo;
                if (msg.senderInfo) {
                    senderInfo = msg.senderInfo;
                } else {
                    senderInfo = (msg.type === 'sent') ? profile : contacts.find(c => c.id === msg.senderId) || { name: '未知成员', avatar: Utils.createAvatarDataUrl('#ccc') };
                }

                if (msg.isRetracted) {
                    messageElement = this.createRetractionNotice(msg, senderInfo);
                } else if (msg.segmentType === 'system') {
                    messageElement = document.createElement('div');
                    messageElement.className = 'system-notice';
                    messageElement.textContent = msg.content;
                } else {
                    messageElement = await this.createMessageElement(msg, senderInfo);
                }
                fragment.prepend(messageElement);


                const isTheVeryLastMessage = absoluteLastMessage && msg.messageId === absoluteLastMessage.messageId;
                if (lastTimestamp > 0 && msg.timestamp - lastTimestamp > 5 * 60 * 1000 && !isTheVeryLastMessage) {
                    const timeDiv = this.createTimeDividerElement(msg.timestamp);
                    fragment.prepend(timeDiv);
                }
                lastTimestamp = msg.timestamp;
            }

            const oldScrollHeight = chatArea.scrollHeight;
            loader.after(fragment);
            chatArea.scrollTop = chatArea.scrollHeight - oldScrollHeight;

            appState.currentChat.renderedCount += messagesToLoad.length;
            if (loader) loader.classList.remove('visible');
            appState.isHistoryLoading = false;


            if (appState.currentChat.renderedCount >= appState.currentChat.allMessages.length) {
                if (loader) loader.remove();
            }
        },

        async createMessageElement(msg, senderInfo, isTyping = false, isAnimating = false) {
            const messageRow = document.createElement('div');
            messageRow.className = `message-row ${msg.type}`;

            if (!isTyping) {
                messageRow.id = msg.messageId;
                messageRow.dataset.messageId = msg.messageId;
            }

            let bubbleContent = '';
            let bubbleClass = 'bubble';
            let detailContent = '';


            if (msg.isAutoReply) {
                bubbleClass += ' auto-reply-bubble';
            }

            if (isTyping) {
                bubbleClass += ` bubble-typing`;
                bubbleContent = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
            } else {
                switch (msg.segmentType) {
                    case 'emoji-image':
                        bubbleClass += ` bubble-emoji`;
                        bubbleContent = `<img src="https://z.wiki/u/${msg.content}" alt="${appState.playerEmojiMap[msg.content] || '表情'}">`;
                        break;
                    case 'image_simulated':
                        bubbleClass += ' image-with-desc-bubble';
                        bubbleContent = `
                            ${msg.cardData.imageSrc ? `<img src="${msg.cardData.imageSrc}" alt="图片">` : ''}
                            <div class="description-text">${msg.cardData.description}</div>
                        `;
                        break;
                    case 'voice':
                        bubbleClass += ' voice-message-bubble';
                        bubbleContent = `<span class="voice-duration">${msg.cardData.duration}</span><div class="voice-wave"><div class="voice-wave-bar"></div><div class="voice-wave-bar"></div><div class="voice-wave-bar"></div><div class="voice-wave-bar"></div><div class="voice-wave-bar"></div></div>`;
                        detailContent = `<div class="voice-transcript">${msg.cardData.content}</div>`;
                        break;
                    case 'quote':
                        bubbleClass += ' quote-message-bubble';
                        bubbleContent = `<div class="quote-block"><span class="quoted-name">${msg.cardData.quotedName}:</span><span>${msg.cardData.quotedContent}</span></div><div>${msg.cardData.newContent}</div>`;
                        break;
                    case 'transfer':
                        bubbleClass += ' transfer-or-red-packet-bubble';
                        if (msg.cardData.isClaimed) bubbleClass += ' claimed';
                        {
                            const themeSettings = await DBHelper.get('apiConfig', 'themeSettings') || {};
                            const transferCoverStyle = themeSettings.transferCover ? `background-image: url(${themeSettings.transferCover}); background-size: cover; background-position: center;` : '';

                            bubbleContent = `
                                <div class="transfer-content-v3" style="${transferCoverStyle}">
                                    <div class="transfer-header-v3">
                                        <i class="fas fa-right-left transfer-icon-v3"></i>
                                        <div class="transfer-info-v3">
                                            <h4>转账给 ${msg.cardData.recipientName}</h4>
                                            <p>${msg.cardData.amount}</p>
                                        </div>
                                    </div>
                                    ${msg.cardData.note ? `<div class="transfer-footer-v3">${msg.cardData.note}</div>` : ''}
                                </div>
                            `;
                        }
                        break;
                    case 'transfer-receipt':
                        bubbleClass += ' received';
                        {
                            const themeSettings = await DBHelper.get('apiConfig', 'themeSettings') || {};
                            const receiptCoverStyle = themeSettings.receiptCover ? `background-image: url(${themeSettings.receiptCover}); background-size: cover; background-position: center;` : '';

                            bubbleContent = `
                                 <div class="transfer-content-v3" style="${receiptCoverStyle}">
                                    <div class="transfer-header-v3">
                                        <i class="fas fa-check-circle transfer-icon-v3"></i>
                                        <div class="transfer-info-v3">
                                            <h4>已收款</h4>
                                            <p>${msg.cardData.amount}</p>
                                        </div>
                                    </div>
                                    <div class="transfer-footer-v3">来自 ${msg.cardData.senderName} 的转账</div>
                                </div>
                            `;
                        }

                        if (!bubbleClass.includes('claimed')) bubbleClass += ' claimed';
                        break;
                    case 'red-packet':
                        bubbleClass += ' transfer-or-red-packet-bubble';
                        if (msg.cardData.isClaimedByPlayer) bubbleClass += ' claimed';
                        {
                            const themeSettings = await DBHelper.get('apiConfig', 'themeSettings') || {};
                            const defaultCover = 'https://z.wiki/u/IDzEvp';
                            const rpCover = themeSettings.redPacketCover || defaultCover;

                            bubbleContent = `
                                <div class="red-packet-v3-wrapper">
                                    <div class="rp-cover-v3" style="background-image: url('${rpCover}');">
                                        <h4 class="rp-title-v3">${msg.cardData.title}</h4>
                                        <div class="open-button-v3">
                                            <i class="fas fa-paw"></i>
                                        </div>
                                    </div>
                                    <div class="claimed-overlay-v3">已领取</div>
                                </div>
                            `;
                        }
                        break;
                    case 'card':
                        bubbleClass += ' card-bubble';
                        const cardId = `card-detail-${msg.messageId}`;
                        let cardInnerHtml = '';

                        switch (msg.cardData.shareType) {
                            case '地点分享': cardInnerHtml = `<div class="card-message-wrapper card-type-3" data-card-id="${cardId}"><div class="card-icon-area" style="background-color: var(--theme-color-1);"><i class="fas fa-map-marker-alt"></i></div><div class="card-content"><h4>${msg.cardData.title}</h4><p>${msg.cardData.summary}</p></div></div>`; break;
                            case '文件分享': cardInnerHtml = `<div class="card-message-wrapper card-type-9" data-card-id="${cardId}"><i class="fas fa-file-archive file-icon" style="color: var(--theme-color-4);"></i><div class="file-info"><h4>${msg.cardData.title}</h4><div class="file-size">${msg.cardData.summary}</div></div></div>`; break;
                            default:
                                const randomCover = appState.cardCoverLibrary[Math.floor(Math.random() * appState.cardCoverLibrary.length)];
                                cardInnerHtml = `<div class="card-message-wrapper card-type-2" data-card-id="${cardId}"><img src="${randomCover}" class="card-image" alt="Card image"><div class="card-content"><h4>${msg.cardData.title}</h4><p>${msg.cardData.summary}</p></div></div>`;
                                break;
                        }

                        const cardDetailHtml = `<div class="card-detail-content" id="${cardId}"><h5>${msg.cardData.title}</h5><p>${msg.cardData.details}</p></div>`;

                        bubbleContent = cardInnerHtml + cardDetailHtml;
                        detailContent = '';
                        break;
                    case 'moment_forward':
                        bubbleClass += ' forwarded-moment-bubble';
                        bubbleContent = `
                            <div class="forwarded-moment-card-content" data-moment-id="${msg.cardData.momentId}">
                                <h4 class="card-title">[朋友圈动态]</h4>
                                <p class="card-preview">${msg.cardData.authorName}：${msg.cardData.preview}</p>
                                <div class="card-footer">朋友圈</div>
                            </div>
                        `;
                        break;
                    case 'text':
                    default:
                        bubbleContent = msg.content;
                        break;
                }
            }

            bubbleClass += ` ${msg.type}`;
            const avatarSrc = (isTyping && msg.isGroupTyping) ? senderInfo.avatar : (senderInfo.avatar || Utils.createAvatarDataUrl('#ccc'));
            const avatarClass = `message-avatar ${isTyping && msg.isGroupTyping ? 'group-avatar-style' : ''}`;
            const chatSettings = await DBHelper.get('apiConfig', 'chatSettings') || {};
            const isGroup = appState.currentChatId.startsWith('group-');
            const isMyMessage = msg.type === 'sent';
            let displayNameHtml = '';


            let timestampHtml = '';
            if (msg.isAutoReply && msg.displayTimestamp) {
                timestampHtml = `
                    <div class="message-timestamp">
                        <span>${msg.displayTimestamp}</span>
                        <span class="auto-reply-tag">未读消息</span>
                    </div>
                `;
            }

            if (!isTyping && !['transfer-receipt'].includes(msg.segmentType)) {
                if (isGroup) {
                    if (!isMyMessage) displayNameHtml = `<div class="message-name">${senderInfo.remark || senderInfo.name}</div>`;
                    else if (chatSettings.showMyNameInGroup) displayNameHtml = `<div class="message-name">${senderInfo.name}</div>`;
                } else {
                    if (chatSettings.showNamesInPrivate) displayNameHtml = `<div class="message-name">${isMyMessage ? senderInfo.name : (senderInfo.remark || senderInfo.name)}</div>`;
                }
            }

            messageRow.innerHTML = `<img src="${avatarSrc}" alt="avatar" class="${avatarClass}"><div class="message-content">${displayNameHtml}<div class="bubble-and-tag-wrapper"><div class="${bubbleClass}">${bubbleContent}</div>${detailContent}</div>${timestampHtml}</div>`;

            const avatarEl = messageRow.querySelector('.message-avatar');
            if (!isTyping) {
                avatarEl.style.cursor = 'pointer';
                if (msg.type === 'received') {
                    avatarEl.addEventListener('click', () => this.showPersonaModal(msg.senderId));
                } else if (msg.type === 'sent') {
                    avatarEl.addEventListener('click', () => AIHandler.handleRegenerateRequest(msg.messageId));
                }
            }
            return messageRow;
        },

        async addMessageToDOM(msg, senderInfo, isTyping = false, isAnimating = false) {
            if (msg.isHidden) return;

            const messageElement = await this.createMessageElement(msg, senderInfo, isTyping, isAnimating);


            if (isTyping && msg.messageId) {
                messageElement.id = msg.messageId;
            }

            chatArea.appendChild(messageElement);

            if (!isTyping) {
                appState.currentChat.allMessages.push(msg);
                appState.currentChat.renderedCount++;
            }
            chatArea.scrollTop = chatArea.scrollHeight;
        },

        createTimeDividerElement(timestamp) {
            const timeDiv = document.createElement('div');
            timeDiv.className = 'time-divider';
            timeDiv.textContent = Utils.formatTimestampSmartly(timestamp);
            return timeDiv;
        },

        createRetractionNotice(msg, senderInfo) {
            const notice = document.createElement('div');
            notice.className = 'retracted-notice';
            const isGroup = appState.currentChatId.startsWith('group-');
            const senderName = msg.type === 'sent' ? '你' : (senderInfo.remark || senderInfo.name);
            notice.textContent = `${senderName} 撤回了一条消息`;

            notice.addEventListener('click', () => {
                let retractedContentHtml = '';
                if (msg.segmentType === 'emoji-image') {
                    retractedContentHtml = `<img src="https://z.wiki/u/${msg.content}" style="max-width: 150px; display: block; margin: 10px auto;">`;
                } else {
                    retractedContentHtml = `<p style="line-height: 1.6;">${msg.content}</p>`;
                }
                this.showModal({
                    title: "被撤回的消息",
                    body: retractedContentHtml,
                    actions: [{ text: '关闭', class: 'btn-primary', handler: () => this.hideModal() }]
                });
            });
            return notice;
        },

        async showPersonaModal(contactId) {
            const contact = await DBHelper.get('contacts', contactId);
            if (!contact) return;

            const chatData = await DBHelper.get('chats', appState.currentChatId);
            const personaMessages = chatData.history.filter(m => m.senderId === contactId && (m.segmentType === 'inner_voice' || m.segmentType === 'essay'));

            const lastInnerVoice = personaMessages.filter(m => m.segmentType === 'inner_voice').pop();
            const lastEssay = personaMessages.filter(m => m.segmentType === 'essay').pop();

            let bodyHtml = `
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <img src="${contact.avatar}" style="width: 70px; height: 70px; border-radius: 12px; object-fit: cover;">
                        <div>
                            <h3 style="font-size: 1.4rem; margin-bottom: 5px;">${contact.remark || contact.name}</h3>
                            <p style="color: #888;">ID: ${contact.name}</p>
                        </div>
                    </div>
                `;

            if (lastInnerVoice) {
                bodyHtml += `
                        <div class="persona-modal-card">
                            <h4>心声</h4>
                            <p>${lastInnerVoice.content}</p>
                        </div>
                    `;
            }

            if (lastEssay) {
                bodyHtml += `
                        <div class="persona-modal-card note-paper">
                            <h4>随笔</h4>
                            <p>${lastEssay.content}</p>
                        </div>
                    `;
            }

            this.showModal({
                title: "角色洞察",
                body: bodyHtml,
                actions: [
                    {
                        text: '进入聊天', class: 'btn-primary', handler: () => {
                            this.hideModal();
                            this.openChat(contactId);
                        }
                    }
                ]
            });
        },

        async showModal(config) {

            if (appState.theme === 'neumorphic' && !config.customClass) {
                modalContentWrapper.classList.add('modal-neumorphic');
            } else if (config.customClass) {
                modalContentWrapper.classList.add(config.customClass);
            }


            if (config.isPersistent) {
                modalOverlay.classList.add('no-overlay-close');
            } else {
                modalOverlay.classList.remove('no-overlay-close');
            }

            let actionsHtml = '';
            if (config.actions) {
                actionsHtml = `<div class="modal-actions">` + config.actions.map((action, index) =>
                    `<button class="modal-btn ${action.class}" data-action-index="${index}">${action.text}</button>`
                ).join('') + `</div>`;
            }

            modalContentWrapper.innerHTML = `
                    <h2 class="modal-header">${config.title}</h2>
                    <div class="modal-body">${config.body}</div>
                    ${actionsHtml}
                `;

            if (config.actions) {

                $$('#modal-content-wrapper .modal-actions .modal-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const index = parseInt(btn.dataset.actionIndex, 10);
                        if (config.actions[index] && typeof config.actions[index].handler === 'function') {
                            config.actions[index].handler();
                        }
                    });
                });
            }

            modalOverlay.classList.add('visible');
        },

        hideModal() {
            modalOverlay.classList.remove('visible');

            modalContentWrapper.className = 'modal-content';
            modalContentWrapper.innerHTML = '';
        },

        showBottomSheet(config) {
            const sheetOverlay = $('#bottom-sheet-overlay');
            const sheetContent = $('#bottom-sheet-content-wrapper');

            sheetContent.className = 'bottom-sheet-content';

            sheetContent.innerHTML = `
                    <div class="bottom-sheet-header">${config.title}</div>
                    <div class="bottom-sheet-body">
                        ${config.items.map(item => `<div class="bottom-sheet-item" data-value="${item.value}">${item.text}</div>`).join('')}
                    </div>
                `;

            if (appState.theme === 'neumorphic') sheetContent.classList.add('neumorphic');
            if (config.customClass) sheetContent.classList.add(...config.customClass.split(' '));

            $$('.bottom-sheet-item').forEach(item => {
                item.addEventListener('click', () => {
                    config.onSelect(item.dataset.value, item.textContent);
                    this.hideBottomSheet();
                });
            });


            sheetOverlay.style.visibility = 'visible';
            requestAnimationFrame(() => {
                sheetOverlay.classList.add('visible');
            });
        },

        hideBottomSheet() {
            const sheetOverlay = $('#bottom-sheet-overlay');
            sheetOverlay.classList.remove('visible');

            setTimeout(() => {
                sheetOverlay.style.visibility = 'hidden';
            }, 300);
        },

        showSidebar(config) {
            const sidebarContent = $('#sidebar-content');
            const sidebarOverlay = $('#sidebar-overlay');


            sidebarContent.className = 'sidebar-content';


            if (appState.theme === 'neumorphic') {
                sidebarContent.classList.add('neumorphic');
            }


            if (config.position === 'left') {
                sidebarContent.classList.add('sidebar-from-left');
            } else {
                sidebarContent.classList.remove('sidebar-from-left');
            }


            let actionsHtml = '';
            if (config.actions) {
                actionsHtml = `<div class="modal-actions" style="margin-top: 30px;">` + config.actions.map((action, index) =>
                    `<button class="modal-btn ${action.class}" data-action-index="${index}">${action.text}</button>`
                ).join('') + `</div>`;
            }
            sidebarContent.innerHTML = `
                    <h2 class="modal-header" style="text-align: left; padding-left: 0;">${config.title}</h2>
                    <div class="modal-body">${config.body}</div>
                    ${actionsHtml}
                `;


            if (config.actions) {
                $$('#sidebar-content .modal-actions .modal-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const index = parseInt(btn.dataset.actionIndex, 10);
                        if (config.actions[index] && typeof config.actions[index].handler === 'function') {
                            config.actions[index].handler();
                        }
                    });
                });
            }


            sidebarOverlay.classList.add('visible');
        },

        hideSidebar() {
            const sidebarOverlay = $('#sidebar-overlay');
            const sidebarContent = $('#sidebar-content');

            sidebarOverlay.classList.remove('visible');


            setTimeout(() => {
                sidebarContent.classList.remove('sidebar-from-left');
            }, 400);
        },

        showToast(message, duration = 1000) {

            const existingToast = $('#toast-notification');
            if (existingToast) {
                existingToast.remove();
            }

            const toast = document.createElement('div');
            toast.id = 'toast-notification';
            toast.className = 'toast-notification';
            toast.textContent = message;


            document.body.appendChild(toast);


            setTimeout(() => {

                toast.classList.add('hiding');

                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }, duration);
        },

        showTopNotification(msg) {
            this.notificationQueue.push(msg);
            this.processNotificationQueue();
        },

        showEssayNotification(authorName, contactId) {

            if ($('.essay-notification-banner')) return;

            const container = $('#top-notification-container');
            const banner = document.createElement('div');
            banner.className = 'essay-notification-banner';
            banner.innerHTML = `
                    <div class="icon-wrapper">
                        <i class="fas fa-heart"></i>
                    </div>
                    <span class="text-content">${authorName} 更新了随笔</span>
                `;


            banner.addEventListener('click', () => {
                this.showPersonaModal(contactId);
                hideAndRemove();
            });

            const hideAndRemove = () => {
                if (container.contains(banner)) {
                    banner.style.animation = 'notification-exit 0.5s forwards';
                    setTimeout(() => {
                        if (container.contains(banner)) container.removeChild(banner);
                    }, 500);
                }
            };

            container.appendChild(banner);


            setTimeout(() => {
                banner.classList.add('is-playing');
            }, 10);


            setTimeout(hideAndRemove, 4000);
        },

        processNotificationQueue() {
            if (this.isDisplayingNotification || this.notificationQueue.length === 0) {
                return;
            }
            this.isDisplayingNotification = true;

            const msg = this.notificationQueue.shift();
            const container = $('#top-notification-container');
            const banner = document.createElement('div');
            banner.className = 'notification-banner';

            let messageContent = msg.content;
            if (msg.segmentType === 'emoji-image') messageContent = '[表情包]';
            else if (msg.segmentType === 'voice') messageContent = msg.cardData.content;
            else if (msg.isRetracted) messageContent = '撤回了一条消息';

            banner.innerHTML = `
                    <img src="${msg.senderInfo.avatar}" alt="avatar" class="notification-avatar">
                    <div class="notification-content">
                        <div class="notification-header">
                            <span class="notification-name">${msg.senderInfo.remark || msg.senderInfo.name}</span>
                            <span class="notification-time">${Utils.formatTimestampSmartly(msg.timestamp)}</span>
                        </div>
                        <p class="notification-message">${messageContent}</p>
                    </div>
                `;

            const hideAndProcessNext = () => {
                if (!container.contains(banner)) return;
                clearTimeout(autoHideTimeout);
                banner.style.animation = 'notification-exit 0.5s forwards';
                setTimeout(() => {
                    if (container.contains(banner)) container.removeChild(banner);
                    this.isDisplayingNotification = false;

                    setTimeout(() => this.processNotificationQueue(), 500);
                }, 500);
            };

            const autoHideTimeout = setTimeout(hideAndProcessNext, 5000);

            banner.addEventListener('click', () => {
                this.openChat(msg.senderId);
                hideAndProcessNext();
            });

            container.appendChild(banner);
        },

        async showContactInfo(contactId) {
            const contact = await DBHelper.get('contacts', contactId);
            if (!contact) return;

            const bodyHtml = `
                    <div class="details-card">
                        <div class="details-header">
                            <img src="${contact.avatar}" class="avatar">
                            <div class="details-info">
                                <div class="name">${contact.remark || contact.name}</div>
                                <div class="id">ID: ${contact.name}</div>
                            </div>
                        </div>
                         <div class="details-field"><span class="label">性别</span><span class="value">${contact.gender}</span></div>
                    </div>
                    <div class="details-card">
                       ${contact.likes ? `<div class="details-field"><span class="label">喜好</span><span class="value">${contact.likes}</span></div>` : ''}
                       ${contact.dislikes ? `<div class="details-field"><span class="label">厌恶</span><span class="value">${contact.dislikes}</span></div>` : ''}
                       ${contact.habits ? `<div class="details-field"><span class="label">习惯</span><span class="value">${contact.habits}</span></div>` : ''}
                       ${contact.background ? `<div class="details-section">
                            <div class="details-section-title">背景资料</div>
                            <p>${contact.background}</p>
                        </div>` : ''}
                    </div>
                    <div class="details-actions">
                        <button class="details-btn btn-details-primary" data-action="chat">发消息</button>
                        <button class="details-btn" data-action="export" style="border-color: var(--theme-color-4); color: var(--text-color-dark);">导出角色</button>
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                             <button class="details-btn" data-action="edit" style="flex: 1;">编辑</button>
                             <button class="details-btn btn-details-danger" data-action="delete" style="flex: 1;">删除好友</button>
                        </div>
                    </div>
                `;

            this.showModal({

                title: `
                        <span style="flex-grow: 1;">详细资料</span>
                        ${contact.author ? `<div class="details-header-attribution" data-action="show-attribution" title="查看作者信息" style="position: static; transform: none;">?</div>` : ''}
                    `,
                body: bodyHtml,
                actions: []
            });


            modalContentWrapper.querySelector('.modal-header').style.display = 'flex';
            modalContentWrapper.querySelector('.modal-header').style.alignItems = 'center';


            modalContentWrapper.querySelector('[data-action="chat"]').addEventListener('click', () => {
                this.hideModal();
                this.openChat(contactId);
            });
            modalContentWrapper.querySelector('[data-action="edit"]').addEventListener('click', () => {
                this.hideModal();

                EventManager.showEditFriendModal(contactId, async () => {
                    await UIManager.renderContactsPage('friends');
                });
            });
            modalContentWrapper.querySelector('[data-action="delete"]').addEventListener('click', async () => {
                const groups = await DBHelper.getAll('groups');
                const isInGroup = groups.some(g => g.members.includes(contactId));
                this.confirmDeleteContact(contactId, isInGroup);
            });
            modalContentWrapper.querySelector('[data-action="export"]').addEventListener('click', () => EventManager.handleExportContact(contactId));

            const attributionBtn = modalContentWrapper.querySelector('[data-action="show-attribution"]');
            if (attributionBtn) {
                attributionBtn.addEventListener('click', () => EventManager.showAttributionModal(contact));
            }
        },

        async showGroupInfo(groupId) {
            const group = await DBHelper.get('groups', groupId);
            if (!group) return;

            const allContacts = await DBHelper.getAll('contacts');
            const myProfile = await DBHelper.get('profile', 'myProfile');

            let creatorName = '未知';
            if (group.creatorId === myProfile.id) {
                creatorName = `我 (${myProfile.name})`;
            } else {
                const creatorContact = allContacts.find(c => c.id === group.creatorId);
                if (creatorContact) creatorName = creatorContact.remark || creatorContact.name;
            }

            const membersDetails = group.members
                .map(memberId => allContacts.find(c => c.id === memberId))
                .filter(Boolean);

            const membersHtml = membersDetails.map(member => `
                    <div class="member-item">
                        <img src="${member.avatar}" class="avatar" alt="${member.name}">
                        <span class="name">${member.remark || member.name}</span>
                    </div>
                `).join('');

            const isMyGroup = group.creatorId === myProfile.id;

            const bodyHtml = `
                    <div class="details-card">
                        <div class="details-header">
                            <img src="${group.avatar}" class="avatar">
                            <div class="details-info">
                                <div class="name">${group.name}</div>
                                <div class="id">群主: ${creatorName}</div>
                            </div>
                        </div>
                    </div>
                    <div class="details-card">
                        <div class="details-section-title">群成员 (${group.members.length})</div>
                        <div class="member-grid">${membersHtml}</div>
                    </div>
                    <div class="details-actions">
                        <button class="details-btn btn-details-primary" data-action="chat">发消息</button>
                        <button class="details-btn" data-action="export" style="border-color: var(--theme-color-4); color: var(--text-color-dark);">导出群聊</button>
                        <button class="details-btn btn-details-danger" data-action="delete">${isMyGroup ? '解散群聊' : '退出群聊'}</button>
                    </div>
                `;

            this.showModal({
                title: `
                        <span style="flex-grow: 1;">群聊资料</span>
                        ${group.author ? `<div class="details-header-attribution" data-action="show-attribution" title="查看作者信息" style="position: static; transform: none;">?</div>` : ''}
                    `,
                body: bodyHtml,
                actions: []
            });


            modalContentWrapper.querySelector('.modal-header').style.display = 'flex';
            modalContentWrapper.querySelector('.modal-header').style.alignItems = 'center';

            modalContentWrapper.querySelector('[data-action="chat"]').addEventListener('click', () => {
                this.hideModal();
                this.openChat(groupId);
            });
            modalContentWrapper.querySelector('[data-action="delete"]').addEventListener('click', () => {
                this.confirmDeleteGroup(groupId, isMyGroup);
            });
            modalContentWrapper.querySelector('[data-action="export"]').addEventListener('click', () => EventManager.handleExportGroup(groupId));

            const attributionBtn = modalContentWrapper.querySelector('[data-action="show-attribution"]');
            if (attributionBtn) {
                attributionBtn.addEventListener('click', () => EventManager.showAttributionModal(group));
            }
        },

        confirmDeleteGroup(groupId, isCreator, onCancel) {
            const actionText = isCreator ? '解散' : '退出';
            this.showModal({
                title: `确认${actionText}`,
                body: `<p>你确定要${actionText}此群聊吗？所有聊天记录将被清空且无法恢复。</p>`,
                actions: [

                    {
                        text: '取消', class: 'btn-secondary', handler: () => {
                            this.hideModal();
                            if (onCancel) {
                                onCancel();
                            } else {
                                this.showGroupInfo(groupId);
                            }
                        }
                    },
                    {
                        text: `确认${actionText}`, class: 'btn-danger', handler: async () => {
                            await DBHelper.delete('groups', groupId);
                            await DBHelper.delete('chats', groupId);
                            this.hideModal();
                            this.hideSidebar();

                            await this.navigateTo('contacts');
                            await this.renderContactsPage('groups');
                        }
                    }
                ]
            });
        },
        async confirmDeleteContact(contactId, isInGroup) {
            if (isInGroup) {
                const groups = (await DBHelper.getAll('groups')).filter(g => g.members.includes(contactId));
                const groupNames = groups.map(g => g.name).join('、');
                this.showModal({
                    title: "无法删除",
                    body: `<p>无法删除好友，因为对方仍在群聊：<strong>${groupNames}</strong> 中。请先将其移出群聊或解散群聊。</p>`,
                    actions: [{ text: '好的', class: 'btn-primary', handler: () => this.showContactInfo(contactId) }]
                });
                return;
            }

            this.showModal({
                title: "确认删除",
                body: `<p>确定要删除该好友吗？所有聊天记录将被清空且无法恢复。</p>`,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => this.showContactInfo(contactId) },
                    {
                        text: '确认删除', class: 'btn-danger', handler: async () => {
                            await DBHelper.delete('contacts', contactId);
                            await DBHelper.delete('chats', contactId);
                            this.hideModal();
                            await this.renderContactsPage();
                        }
                    }
                ]
            });
        },
        async showGroupManagementSidebar(group) {
            const myProfile = await DBHelper.get('profile', 'myProfile');
            const isMyGroup = group.creatorId === myProfile.id;


            this.showSidebar({
                position: 'right',
                title: "群聊管理",
                body: `
                        <div class="settings-list" style="padding:0; margin:0 -10px;">
                            <div class="setting-item" id="sidebar-edit-group">
                                <i class="fas fa-edit"></i>
                                <span>修改群聊信息</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-view-members">
                                <i class="fas fa-users"></i>
                                <span>查看群成员</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-invite-members">
                                <i class="fas fa-user-plus"></i>
                                <span>邀请新成员</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            ${isMyGroup ? `
                            <div class="setting-item" id="sidebar-remove-members">
                                <i class="fas fa-user-minus"></i>
                                <span>移除群成员</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            ` : ''}
                            <div class="setting-item" id="sidebar-bind-prompts">
                                <i class="fas fa-link"></i>
                                <span>绑定提示词</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-opening-scene">
                                <i class="fas fa-scroll"></i>
                                <span>开场白设定</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-chat-background">
                                <i class="fas fa-image"></i>
                                <span>专属聊天背景</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-leave-group">
                                <i class="fas ${isMyGroup ? 'fa-dumpster-fire' : 'fa-door-open'}"></i>
                                <span>${isMyGroup ? '解散群聊' : '退出群聊'}</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                    `,
                actions: []
            });


            $('#sidebar-edit-group').addEventListener('click', () => {
                this.showModal({
                    title: "修改群聊信息",
                    body: `
                            <div class="form-group">
                                <label>群头像</label>
                                <div class="avatar-uploader">
                                    <img src="${group.avatar}" id="group-manage-avatar-preview" class="avatar-preview">
                                    <input type="file" id="group-manage-avatar-input" accept="image/*" style="display:none;">
                                    <button class="upload-btn" onclick="document.getElementById('group-manage-avatar-input').click()">上传新头像</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="group-manage-name">群名称</label>
                                <input type="text" id="group-manage-name" value="${group.name}">
                            </div>
                        `,
                    actions: [
                        { text: '取消', class: 'btn-secondary', handler: () => this.hideModal() },
                        {
                            text: '保存', class: 'btn-primary', handler: async () => {
                                const newName = $('#group-manage-name').value.trim();
                                if (!newName) return;
                                const oldName = group.name;
                                const updatedGroup = { ...group, name: newName, avatar: $('#group-manage-avatar-preview').src };
                                await DBHelper.put('groups', updatedGroup);
                                chatTitle.textContent = newName;

                                if (oldName !== newName) {
                                    const myProfile = await DBHelper.get('profile', 'myProfile');
                                    const systemMessage = {
                                        messageId: Utils.generateId('msg'),
                                        content: `${myProfile.name} 修改群名为 “${newName}”`,
                                        timestamp: Date.now(),
                                        type: 'received',
                                        segmentType: 'system',
                                        forAi: true,
                                    };
                                    const chatData = await DBHelper.get('chats', group.id) || { chatId: group.id, history: [] };
                                    chatData.history.push(systemMessage);
                                    await DBHelper.put('chats', chatData);
                                    if (appState.currentChatId === group.id) {
                                        await UIManager.refreshChatView();
                                    }
                                }
                                this.hideModal();
                            }
                        }
                    ]
                });
                $('#group-manage-avatar-input').addEventListener('change', async (e) => {
                    const file = e.target.files[0];
                    if (file) $('#group-manage-avatar-preview').src = await Utils.fileToBase64(file);
                });
            });

            $('#sidebar-view-members').addEventListener('click', () => this.showGroupMemberListModal(group.id));
            $('#sidebar-invite-members').addEventListener('click', () => EventManager.handleInviteMembers(group.id));
            if (isMyGroup) {
                $('#sidebar-remove-members').addEventListener('click', () => EventManager.handleRemoveMembers(group.id));
            }
            $('#sidebar-bind-prompts').addEventListener('click', () => EventManager.showBindingModal(group.id));
            $('#sidebar-opening-scene').addEventListener('click', () => EventManager.handleOpeningSceneSettings(group.id, true));
            $('#sidebar-chat-background').addEventListener('click', () => EventManager.handleChatBackgroundSettings(group.id, true));
            $('#sidebar-leave-group').addEventListener('click', () => {
                this.confirmDeleteGroup(group.id, isMyGroup, () => this.showGroupManagementSidebar(group));
            });
        },

        async showGroupMemberListModal(groupId) {
            const group = await DBHelper.get('groups', groupId);
            const allContacts = await DBHelper.getAll('contacts');
            const myProfile = await DBHelper.get('profile', 'myProfile');


            const aiMembers = group.members
                .map(id => allContacts.find(c => c.id === id))
                .filter(Boolean);


            const playerAsMember = {
                id: myProfile.id,
                avatar: myProfile.avatar,
                name: myProfile.name,
                isPlayer: true
            };


            const allParticipants = [...aiMembers, playerAsMember];


            let owner;
            const otherMembers = [];
            allParticipants.forEach(p => {
                if (p.id === group.creatorId) {
                    owner = p;
                } else {
                    otherMembers.push(p);
                }
            });


            const finalOrderedList = owner ? [owner, ...otherMembers] : otherMembers;


            const membersHtml = finalOrderedList.map(member => `
                    <div class="member-list-modal-item">
                        <img src="${member.avatar}" alt="${member.name}">
                        <span>${member.remark || member.name}</span>
                        ${member.id === group.creatorId ? '<span class="owner-tag">群主</span>' : ''}
                        ${member.isPlayer ? '<span class="owner-tag" style="background-color: var(--accent-color);">你</span>' : ''}
                    </div>
                `).join('');

            this.showModal({
                title: `群成员 (${finalOrderedList.length})`,
                body: `<div class="member-list-modal-body"><ul>${membersHtml}</ul></div>`,
                actions: [{ text: '关闭', class: 'btn-primary', handler: () => this.hideModal() }]
            });
        },

        async showFriendManagementSidebar(contact) {

            this.showSidebar({
                position: 'right',
                title: "好友管理",
                body: `
                        <div class="settings-list" style="padding:0; margin:0 -10px;">
                            <div class="setting-item" id="sidebar-view-friend">
                                <i class="fas fa-info-circle"></i>
                                <span>查看详细资料</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-edit-friend">
                                <i class="fas fa-user-edit"></i>
                                <span>修改好友信息</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-bind-prompts">
                                <i class="fas fa-link"></i>
                                <span>绑定提示词</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-opening-scene-friend">
                                <i class="fas fa-scroll"></i>
                                <span>开场白设定</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-chat-background">
                                <i class="fas fa-image"></i>
                                <span>专属聊天背景</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-delete-friend">
                                <i class="fas fa-user-times"></i>
                                <span>删除好友</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                    `,
                actions: []
            });


            $('#sidebar-view-friend').addEventListener('click', () => {
                this.showModal({
                    title: "详细资料",
                    body: `
                            <div class="details-card">
                                <div class="details-header"><img src="${contact.avatar}" class="avatar"><div class="details-info"><div class="name">${contact.remark || contact.name}</div><div class="id">ID: ${contact.name}</div></div></div>
                                <div class="details-field"><span class="label">性别</span><span class="value">${contact.gender}</span></div>
                            </div>
                            <div class="details-card">
                               ${contact.likes ? `<div class="details-field"><span class="label">喜好</span><span class="value">${contact.likes}</span></div>` : ''}
                               ${contact.dislikes ? `<div class="details-field"><span class="label">厌恶</span><span class="value">${contact.dislikes}</span></div>` : ''}
                               ${contact.habits ? `<div class="details-field"><span class="label">习惯</span><span class="value">${contact.habits}</span></div>` : ''}
                               ${contact.background ? `<div class="details-section"><div class="details-section-title">背景资料</div><p>${contact.background}</p></div>` : ''}
                            </div>
                        `,
                    actions: [{ text: '关闭', class: 'btn-primary', handler: () => this.hideModal() }]
                });
            });

            $('#sidebar-edit-friend').addEventListener('click', () => {
                EventManager.showEditFriendModal(contact.id);
            });

            $('#sidebar-bind-prompts').addEventListener('click', () => EventManager.showBindingModal(contact.id));
            $('#sidebar-opening-scene-friend').addEventListener('click', () => EventManager.handleOpeningSceneSettings(contact.id, false));
            $('#sidebar-chat-background').addEventListener('click', () => EventManager.handleChatBackgroundSettings(contact.id, false));
            $('#sidebar-delete-friend').addEventListener('click', async () => {
                const groups = await DBHelper.getAll('groups');
                const isInGroup = groups.some(g => g.members.includes(contact.id));
                this.confirmDeleteContact(contact.id, isInGroup);
            });
        },


        async confirmDeleteContact(contactId, isInGroup) {
            if (isInGroup) {
                const groups = (await DBHelper.getAll('groups')).filter(g => g.members.includes(contactId));
                const groupNames = groups.map(g => g.name).join('、');
                this.showModal({
                    title: "无法删除",
                    body: `<p>无法删除好友，因为对方仍在群聊：<strong>${groupNames}</strong> 中。请先将其移出或解散相关群聊。</p>`,
                    actions: [{ text: '好的', class: 'btn-primary', handler: () => this.hideModal() }]
                });
                return;
            }

            this.showModal({
                title: "确认删除",
                body: `<p>确定要删除该好友吗？所有聊天记录将被清空且无法恢复。</p>`,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => this.hideModal() },
                    {
                        text: '确认删除', class: 'btn-danger', handler: async () => {
                            await DBHelper.delete('contacts', contactId);
                            await DBHelper.delete('chats', contactId);
                            this.hideModal();
                            this.hideSidebar();
                            await this.navigateTo('messages');
                        }
                    }
                ]
            });
        },
        async showOpeningSceneModal(entityId, isGroup) {
            const scenes = (await DBHelper.getAll('openingScenes')).filter(s => {
                return isGroup ? s.groupId === entityId : s.contactId === entityId;
            });

            let scenesHtml = scenes.map(scene => `
                    <div class="details-card" style="padding: 15px; margin-bottom: 15px;">
                        <h4 style="margin-bottom: 10px; font-size: 1.1rem;">${scene.name}</h4>
                        <p style="font-size: 0.9rem; color: var(--text-color-medium); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${scene.content}
                        </p>
                        <div class="modal-actions" style="margin-top: 15px; justify-content: flex-end; gap: 8px;">
                            <button class="modal-btn btn-danger" data-action="delete" data-scene-id="${scene.id}" style="padding: 6px 12px; font-size: 0.8rem;">删除</button>
                            <button class="modal-btn btn-secondary" data-action="edit" data-scene-id="${scene.id}" style="padding: 6px 12px; font-size: 0.8rem;">编辑</button>
                            <button class="modal-btn btn-primary" data-action="apply" data-scene-id="${scene.id}" style="padding: 6px 12px; font-size: 0.8rem;">应用</button>
                        </div>
                    </div>
                `).join('');

            if (scenes.length === 0) {
                scenesHtml = `<p style="text-align: center; color: #aaa; padding: 20px 0;">还没有开场白，快来创建一个吧！</p>`;
            }

            this.showModal({
                title: "开场白设定",
                body: `
                        <div id="opening-scene-list">${scenesHtml}</div>
                    `,
                actions: [
                    { text: '新建开场白', class: 'btn-primary', handler: () => EventManager.handleNewOpeningScene(entityId, isGroup) }
                ]
            });


            $('#opening-scene-list').addEventListener('click', async (e) => {
                const button = e.target.closest('button');
                if (!button) return;

                const action = button.dataset.action;
                const sceneId = button.dataset.sceneId;

                if (action === 'delete') {
                    EventManager.handleDeleteOpeningScene(sceneId, entityId, isGroup);
                } else if (action === 'edit') {
                    const scene = await DBHelper.get('openingScenes', sceneId);
                    EventManager.handleEditOpeningScene(scene, isGroup);
                } else if (action === 'apply') {
                    const scene = await DBHelper.get('openingScenes', sceneId);
                    EventManager.handleApplyOpeningScene(scene);
                }
            });
        },


        async renderMomentsPage(circleId = null) {

            if (circleId) {
                appState.currentCircleId = circleId;
            } else if (!appState.currentCircleId) {
                const circles = await DBHelper.getAll('circles');
                if (circles.length > 0) {
                    appState.currentCircleId = circles[0].id;
                } else {

                    $('#moments-list').innerHTML = `<li style="text-align:center; color: #aaa; padding: 40px 0;">还没有创建任何圈子，<br>点击右上角菜单去创建一个吧！</li>`;
                    return;
                }
            }


            const currentCircle = await DBHelper.get('circles', appState.currentCircleId);
            const myProfile = await DBHelper.get('profile', 'myProfile');

            if (!currentCircle) {
                $('#moments-list').innerHTML = `<li style="text-align:center; color: #aaa; padding: 40px 0;">圈子不存在或已被删除。</li>`;
                appState.currentCircleId = null;

                $('#moments-my-name').textContent = myProfile.name;
                $('#moments-my-avatar').src = myProfile.avatar;
                return;
            }

            const moments = (await DBHelper.getAll('moments')).filter(m => m.circleId === appState.currentCircleId).sort((a, b) => b.timestamp - a.timestamp);
            const allContacts = await DBHelper.getAll('contacts');


            $('#moments-bg').src = currentCircle.backgroundImage || 'https://z.wiki/autoupload/20240706/3g0x.250-1_2_0.png';
            $('#moments-my-name').textContent = myProfile.name;
            $('#moments-my-avatar').src = myProfile.avatar;


            const momentsListUl = $('#moments-list');
            momentsListUl.innerHTML = '';
            if (moments.length === 0) {
                momentsListUl.innerHTML = `<li style="text-align:center; color: #aaa; padding: 40px 0;">这个圈子还没有动态，<br>点击右上角刷新一下试试？</li>`;
            } else {
                for (const moment of moments) {
                    const momentElement = this.createMomentElement(moment, myProfile, allContacts, currentCircle.extraMembers);
                    momentsListUl.appendChild(momentElement);
                }
            }
        },

        createMomentElement(moment, myProfile, allContacts, extraMembersStr) {
            const li = document.createElement('li');
            li.className = 'moments-post';
            li.dataset.momentId = moment.id;


            let author = { name: '未知用户', avatar: Utils.createAvatarDataUrl('#ccc') };
            if (moment.authorId === myProfile.id) {
                author = myProfile;
            } else {
                const contactAuthor = allContacts.find(c => c.id === moment.authorId);
                if (contactAuthor) {
                    author = contactAuthor;
                } else if (extraMembersStr && extraMembersStr.includes(moment.authorId)) {
                    author = { name: moment.authorId, avatar: Utils.createAvatarDataUrl(Utils.getRandomColor()) };
                }
            }


            let imagesHtml = '';
            if (moment.images && moment.images.length > 0) {
                const gridClass = `grid-${moment.images.length > 9 ? 9 : moment.images.length}`;
                imagesHtml = `
                        <div class="post-images-grid ${gridClass}">
                            ${moment.images.map(src => `<img src="${src}" alt="动态图片">`).join('')}
                        </div>`;
            }


            const hasLikes = moment.likes && moment.likes.length > 0;
            const hasComments = moment.comments && moment.comments.length > 0;
            const playerHasLiked = moment.likes && moment.likes.includes(myProfile.name);

            let likesHtml = '';
            if (hasLikes) {
                likesHtml = `<div class="post-likes"><i class="fas fa-heart"></i> ${moment.likes.join(', ')}</div>`;
            }

            let commentsHtml = '';
            if (hasComments) {
                commentsHtml = moment.comments.map(comment => {
                    let commentAuthor = { name: '未知', id: null };
                    if (comment.authorId === myProfile.id) {
                        commentAuthor = myProfile;
                    } else {
                        const contactCommenter = allContacts.find(c => c.id === comment.authorId);
                        if (contactCommenter) {
                            commentAuthor = contactCommenter;
                        } else if (extraMembersStr && extraMembersStr.includes(comment.authorId)) {
                            commentAuthor = { name: comment.authorId, id: comment.authorId };
                        }
                    }

                    const authorStyle = commentAuthor.id === myProfile.id ? 'style="color: #EDD4D8;"' : '';
                    const replyHtml = comment.replyTo ? `<span class="comment-reply-to"> 回复 </span><span class="comment-author">${comment.replyTo}:</span>` : ':';

                    return `<div class="post-comment-item" data-author-name="${commentAuthor.name}" data-author-id="${commentAuthor.id}">
                                    <span class="comment-author" ${authorStyle}>${commentAuthor.name}</span>${replyHtml} ${comment.content}
                                </div>`;
                }).join('');
            }

            const authorStyle = author.id === myProfile.id ? 'style="color: #EDD4D8;"' : '';

            li.innerHTML = `
                    <img src="${author.avatar}" alt="作者头像" class="post-avatar">
                    <div class="post-main-content">
                        <div class="post-author-name" ${authorStyle}>${author.name}</div>
                        <div class="post-text">${moment.content}</div>
                        ${imagesHtml}
                        <div class="post-footer">
                            <span class="post-timestamp">${Utils.formatTimestampSmartly(moment.timestamp)}</span>
                        <div class="action-buttons-wrapper">
                            <button class="post-action-icon-btn" data-action="forward" title="转发">
                                <i class="fas fa-share"></i>
                            </button>
                            <button class="post-action-icon-btn ${playerHasLiked ? 'liked' : ''}" data-action="like" title="点赞">
                                <i class="far fa-heart"></i>
                            </button>
                            <button class="post-actions-btn" data-action="toggle-comment" title="评论">
                                <i class="fas fa-comment-dots"></i>
                            </button>
                        </div>
                      </div>
                        ${(hasLikes || hasComments) ? `
                        <div class="post-interactions">
                            ${likesHtml}
                            <div class="post-comments-list">${commentsHtml}</div>
                            <div class="comment-input-wrapper">
                                <input type="text" placeholder="评论...">
                                <button data-action="submit-comment">发送</button>
                            </div>
                        </div>
                        ` : `
                        <div class="post-interactions" style="display:none;">
                            <div class="post-likes"></div>
                            <div class="post-comments-list"></div>
                            <div class="comment-input-wrapper">
                                <input type="text" placeholder="评论...">
                                <button data-action="submit-comment">发送</button>
                            </div>
                        </div>
                        `}
                    </div>
                `;
            return li;
        },

        async showCircleManagementSidebar() {
            this.showSidebar({
                position: 'right',
                title: "朋友圈管理",
                body: `
                        <div class="settings-list" style="padding:0; margin:0 -10px;">
                            <div class="setting-item" id="sidebar-switch-circle">
                                <i class="fas fa-sync-alt"></i>
                                <span>切换圈子</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-view-circle">
                                <i class="fas fa-info-circle"></i>
                                <span>查看圈子信息</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-add-circle">
                                <i class="fas fa-plus-circle"></i>
                                <span>新增圈子</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-edit-circle">
                                <i class="fas fa-edit"></i>
                                <span>修改当前圈子</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="sidebar-delete-circle">
                                <i class="fas fa-trash-alt"></i>
                                <span>删除圈子</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                    `,
                actions: []
            });

            $('#sidebar-switch-circle').onclick = () => EventManager.handleSwitchCircle();
            $('#sidebar-view-circle').onclick = () => EventManager.handleViewCircleInfo();
            $('#sidebar-add-circle').onclick = () => EventManager.handleAddCircle();
            $('#sidebar-edit-circle').onclick = () => EventManager.handleEditCircle(appState.currentCircleId);
            $('#sidebar-delete-circle').onclick = () => EventManager.handleDeleteCircle();
        },

        async applyChatBackground(chatId) {
            const isGroup = chatId.startsWith('group-');
            const entity = await DBHelper.get(isGroup ? 'groups' : 'contacts', chatId);
            const themeSettings = await DBHelper.get('apiConfig', 'themeSettings') || {};
            const chatAreaEl = $('#chat-area');


            const defaultChatBgColor = 'var(--bg-main)';


            if (entity && entity.chatBackground) {
                chatAreaEl.style.backgroundImage = `url(${entity.chatBackground})`;
                chatAreaEl.style.backgroundSize = 'cover';
                chatAreaEl.style.backgroundPosition = 'center';
                chatAreaEl.style.backgroundColor = '';
                return;
            }


            if (themeSettings.globalChatBg) {
                chatAreaEl.style.backgroundImage = `url(${themeSettings.globalChatBg})`;
                chatAreaEl.style.backgroundSize = 'cover';
                chatAreaEl.style.backgroundPosition = 'center';
                chatAreaEl.style.backgroundColor = '';
                return;
            }


            chatAreaEl.style.backgroundImage = '';
            chatAreaEl.style.backgroundColor = defaultChatBgColor;
        }
    };



    const AIHandler = {
        groupChatRules: `\n---
群聊专属规则：
1.  **多角色发言**：你可以让多个角色发言，每个角色的发言都是独立的单元，你可以根据人设安排部分群友不发言(例如有的角色是早睡设定,时间太晚就不会回复)，但至少需要构造一名群友的发言。
2.  **私聊消息**: 如果想对玩家说一些不想让其他人知道的话，请使用 <私聊></私聊> 标签包裹。标签内的消息格式依然遵循所有基础规则（如 <私聊>[方鹤安|你在群里说的那句话是什么意思]</私聊>）。
3.  **修改群名**: 你可以根据剧情发展，主动修改群名。格式为：<系统>角色名 修改群名为"新群名"</系统>。例如：<系统>商时序 修改群名为"F4"</系统>。注意：此行为必须符合你的角色设定，不能随意或无理由地修改。
4.**群友回复顺序不固定，可以交叉回复，例如群友A、群友B、群友B、群友A、群友C这样的交叉顺序。不一定要一个人全部说完了才轮到下一个人。群友之间也可以有互动对话，例如使用@提及其他群友。**
---`,
        formatPromptTpl: `\n---
回复规则（非常重要！请严格遵守！）：
1.  你的所有回复都必须严格遵循以下格式，使用**角色名**，而不是其他昵称/称呼，每一句话都是一个独立的单元。
2.  **普通文本消息**：请将你的普通回复拆分成多个通畅的短句，并使用格式：[角色名|消息内容]。例如：[陈奚楷|你好啊]。
3.  **表情包消息**：<角色名|表情包ID>，**禁止在<>外面包裹[]**。你必须在< >中使用冒号左边的ID，而不是文字描述。可用表情包ID及其含义：\n${Object.entries(appState.aiEmojiMap).map(([id, desc]) => `${id}：${desc}`).join('\n')}。
4.  **撤回消息**：如果你想表达某种情绪或者说出一些角色会后悔的话或者不小心发出来的话，请将该短句用英文大括号包裹，格式为：{角色名|已经发送然后立刻撤回的原始消息内容}。例如：例如：{孟祁年|装货，你以为老子不知道你什么心思吗}。不要发送一条正常消息再发送一条“撤回”的指令。
5.  **语音消息**：[角色名|语音|语音时长|语音内容]。语音时长最长不超过60s。例如：[三三|语音|13s|太好了！那我们下午三点在公司会议室详细讨论]。
6.  **引用消息**: [角色名|引用|被引用人ID|被引用的消息内容|你的新消息内容]。不要滥用。例如: [陈奚楷|引用|楚寻|你哪里不会?|关于最后一题我还有点疑问。]。禁止引用转账/红包消息
7.  **转账消息**: [角色名|转账|被转账角色名|金额|备注]。金额格式为 "￥XX.XX"。例如: [孟祁年|转账|商时序|￥520.00|给你的惊喜]。
8.  **领取转账消息 (仅供历史记录参考，你不能生成此格式)**: [收款方|领取转账|转账人|金额]。例如: [商时序|领取转账|孟祁年|￥50.00]。
9.  **红包消息**: [角色名|红包|红包名称|金额|红包个数]。金额必须大于等于“红包个数 * 0.01”。私聊时红包个数必须为1。例如: [孟祁年|红包|请大家喝奶茶|￥88.88|4]。
10. **卡片消息**: 当你想分享一类卡片消息（如：地点分享、文件分享、歌曲分享、或者其他有趣的可以用卡片发出来的分享内容）时，使用这种格式：『角色名|分享类型|分享标题|简介15字以内|详细内容30-60字』，举例：『角色名|图片分享|夏日海滩|一张记录美好瞬间的照片|照片里是蔚蓝的大海和金色的沙滩，充满了夏日的活力与惬意。』
11. **心声 (强制要求)**: 在你本次所有消息内容之后，你必须以【心声|角色名|你的心声内容】的格式来结束你的整个回复。**字数不超过30字。**
12. **随笔 (概率出现)**: 你有一定概率会在【心声】之后，额外写一段「随笔|角色名|你的随笔内容」。这段随笔是角色在当前情境下，有感而发的一些思考或经历，可以与当前对话内容相关，也可以是独立的小故事或心情记录。字数请控制在50到250字之间。
13. **严禁事项(1)**：绝不允许你代入玩家（“{PLAYER_NAME}”）的角色发言或为其生成心声。
14. **严禁事项(2)**：你的回复内容中，不要使用括号 ()、星号 ** 或其他任何符号来描述角色的动作、表情或内心活动。
---
现在，请根据以上信息，对玩家的最新消息进行回应。`,

        activeReplyPromptTpl: `\n---
主动回复规则（非常重要！请严格遵守！）：
1.  你现在需要主动发送一些消息。你的所有回复都必须严格遵循以下格式，在每条消息的末尾附带消息时间，使用 | 分隔。
2.  **普通文本消息**：请将你的普通回复拆分成多个通畅的短句，并使用格式：[角色名|消息内容|消息时间]。例如：[陈奚楷|下午去看电影吗|14:50]。
3.  **表情包消息**：<角色名|表情包ID|消息时间>，**禁止在<>外面包裹[]**。你必须在< >中使用冒号左边的ID，而不是文字描述。可用表情包ID及其含义：${Object.entries(appState.aiEmojiMap).map(([id, desc]) => `${id}：${desc}`).join('\n')}。
4.  **撤回消息**：如果你想表达某种情绪或者说出一些角色会后悔的话或者不小心发出来的话，请将该短句用英文大括号包裹，格式为：{角色名|消息内容|消息时间}
5.  **语音消息**：[角色名|语音|语音时长|语音内容|消息时间]。语音时长最长不超过60s。例如：[三三|语音|13s|太好了！那我们下午三点在公司会议室详细讨论|13:43]。
6.  **引用消息**: [角色名|引用|被引用人ID|被引用的消息内容|你的新消息内容|消息时间]。不要滥用。例如: [陈奚楷|引用|楚寻|你哪里不会?|关于最后一题我还有点疑问。|9:46]。禁止引用转账/红包消息
7.  **转账消息**: [角色名|转账|收款人角色名|金额|备注]。金额格式为 "￥XX.XX"。例如: [孟祁年|转账|商时序|￥520.00|给你的惊喜]。
8.  **红包消息**: [角色名|红包|红包名称|金额|红包个数]。金额必须大于等于“红包个数 * 0.01”。私聊时红包个数必须为1。例如: [孟祁年|红包|请大家喝奶茶|￥88.88|4]。
9. **卡片消息**: 当你想分享一类卡片消息（如：地点分享、文件分享、歌曲分享、或者其他有趣的可以用卡片发出来的分享内容）时，使用这种格式：『角色名|分享类型|分享标题|简介15字以内|详细内容30-60字|消息时间』，举例：『角色名|图片分享|夏日海滩|一张记录美好瞬间的照片|照片里是蔚蓝的大海和金色的沙滩，充满了夏日的活力与惬意。|7/2 12:36』
10. **心声 (强制要求)**: 在你本次所有消息内容之后，你必须以【心声|角色名|你的心声内容】的格式来结束你的整个回复。字数不超过30字。
11. **随笔 (概率出现)**: 你有一定概率会在【心声】之后，额外写一段「随笔|角色名|你的随笔内容」。这段随笔是角色在当前情境下，有感而发的一些思考或经历，可以与当前对话内容相关，也可以是独立的小故事或心情记录。字数请控制在50到250字之间。
13. **严禁事项(1)**：绝不允许你代入玩家（“{PLAYER_NAME}”）的角色发言或为其生成心声。
14. **严禁事项(2)**：你的回复内容中，不要使用括号 ()、星号 ** 或其他任何符号来描述角色的动作、表情或内心活动。
---
现在，请根据以上信息，开始你的主动发言。`,

        buildTurnsFromHistory(history, allContacts, myProfile) {
            if (!history || history.length === 0) return [];

            const formatMessageContent = (msg, senderName, myName) => {
                if (msg.isRetracted) {
                    const retracter = (msg.type === 'sent') ? myName : senderName;
                    return `{${retracter}|${msg.content}}`;
                }
                if (msg.segmentType === 'inner_voice') {
                    return `【心声|${senderName}|${msg.content}】`;
                }
                switch (msg.segmentType) {
                    case 'text': return `[${senderName}|${msg.content}]`;
                    case 'emoji-image': return `<${senderName}|${msg.content}>`;
                    case 'voice': return `[${senderName}|语音|${msg.cardData.duration}|${msg.cardData.content}]`;
                    case 'quote': return `[${senderName}|引用|${msg.cardData.quotedName}|${msg.cardData.quotedContent}|${msg.cardData.newContent}]`;
                    case 'transfer': return `[${senderName}|转账|${msg.cardData.recipientName}|${msg.cardData.amount}|${msg.cardData.note || ''}]`;
                    case 'red-packet': return `[${senderName}|红包|${msg.cardData.title}|￥${msg.cardData.amount.toFixed(2)}|${msg.cardData.count}]`;
                    case 'image_simulated': return `[${senderName}|图片描述|${msg.cardData.description}]`;
                    case 'system': return msg.forAi ? `<系统>${msg.content}</系统>` : '';
                    case 'moment_forward': return msg.content;
                    default: return '';
                }
            };

            const relevantHistory = history.filter(m => m.segmentType !== 'essay' && !m.isHidden);
            if (relevantHistory.length === 0) return [];

            let turns = [];
            let currentTurn = null;

            for (const msg of relevantHistory) {
                const sender = (msg.type === 'sent') ? myProfile : allContacts.find(c => c.id === msg.senderId);
                if (!sender && msg.segmentType !== 'system') continue;

                const senderName = sender ? (msg.type === 'sent' ? myProfile.name : sender.name) : '系统';
                const formattedContent = formatMessageContent(msg, senderName, myProfile.name);
                if (!formattedContent) continue;

                const role = msg.type === 'sent' ? 'player' : 'ai';

                if (currentTurn && currentTurn.role === role) {
                    currentTurn.content += formattedContent;
                } else {
                    if (currentTurn) {
                        turns.push(currentTurn);
                    }
                    currentTurn = {
                        role: role,
                        time: Utils.formatTimestampForPrompt(msg.timestamp),
                        content: formattedContent
                    };
                }
            }
            if (currentTurn) {
                turns.push(currentTurn);
            }
            return turns;
        },

        apiConfig: {},
        isAwaitingResponse: false,
        abortController: null,

        async loadApiConfig() {
            let config = await DBHelper.get('apiConfig', 'mainConfig');
            if (!config) {
                config = {
                    id: 'mainConfig',
                    provider: 'gemini',
                    url: 'https://generativelanguage.googleapis.com/v1beta/models/',
                    key: '',
                    model: 'gemini-2.5-flash',
                    temperature: 0.7
                };
                await DBHelper.put('apiConfig', config);
            }
            this.apiConfig = config;
        },

        async saveApiConfig(newConfig) {
            this.apiConfig = { ...this.apiConfig, ...newConfig, id: 'mainConfig' };
            await DBHelper.put('apiConfig', this.apiConfig);
        },

        async buildPrompt() {
            const chatId = appState.currentChatId;
            if (!chatId) return null;


            const myProfile = await DBHelper.get('profile', 'myProfile');
            const allContacts = await DBHelper.getAll('contacts');
            const allGroups = await DBHelper.getAll('groups');

            const defaults = {
                memoryInterconnection: false,
                historyLength: 20,
                promptTurnFrequency: 1
            };
            const savedSettings = await DBHelper.get('apiConfig', 'chatSettings');
            const chatSettings = { ...defaults, ...savedSettings };
            const isGroup = chatId.startsWith('group-');


            const chatData = await DBHelper.get('chats', chatId) || { chatId, history: [], turnCountSinceLastPrompt: 0 };

            let extraEmojiHintPrompt = '';
            if (chatData && chatData.history.length > 0) {
                const lastPlayerTurnMessages = [];
                for (let i = chatData.history.length - 1; i >= 0; i--) {
                    const msg = chatData.history[i];
                    if (msg.type === 'sent') {
                        lastPlayerTurnMessages.unshift(msg);
                    } else {

                        break;
                    }
                }

                if (lastPlayerTurnMessages.length > 0) {
                    const extraEmojiIds = new Set();
                    lastPlayerTurnMessages.forEach(msg => {
                        if (msg.segmentType === 'emoji-image' && !appState.aiEmojiMap.hasOwnProperty(msg.content)) {
                            extraEmojiIds.add(msg.content);
                        }
                    });

                    if (extraEmojiIds.size > 0) {
                        let hintContent = '';
                        extraEmojiIds.forEach(id => {
                            const meaning = appState.playerEmojiMap[id];
                            if (meaning) {
                                hintContent += `${id}：${meaning}\n`;
                            }
                        });

                        if (hintContent) {
                            extraEmojiHintPrompt = `\n--- 补充信息：玩家最新发送的表情包含义如下 ---\n${hintContent.trim()}\n---`;
                        }
                    }
                }
            }

            const turnFrequency = (chatSettings.promptTurnFrequency > 0) ? chatSettings.promptTurnFrequency : 1;
            const shouldSendFullPrompt = (chatData.turnCountSinceLastPrompt || 0) >= turnFrequency;


            const formatMessageContent = (msg, senderName, myName) => {
                if (msg.isRetracted) {
                    const retracter = (msg.type === 'sent') ? myName : senderName;
                    return `{${retracter}|${msg.content}}`;
                }
                if (msg.segmentType === 'inner_voice') {
                    return `【心声|${senderName}|${msg.content}】`;
                }
                switch (msg.segmentType) {
                    case 'text': return `[${senderName}|${msg.content}]`;
                    case 'emoji-image': return `<${senderName}|${msg.content}>`;
                    case 'voice': return `[${senderName}|语音|${msg.cardData.duration}|${msg.cardData.content}]`;
                    case 'quote': return `[${senderName}|引用|${msg.cardData.quotedName}|${msg.cardData.quotedContent}|${msg.cardData.newContent}]`;
                    case 'transfer': return `[${senderName}|转账|${msg.cardData.recipientName}|${msg.cardData.amount}|${msg.cardData.note || ''}]`;
                    case 'red-packet': return `[${senderName}|红包|${msg.cardData.title}|￥${msg.cardData.amount.toFixed(2)}|${msg.cardData.count}]`;
                    case 'image_simulated': return `[${senderName}|图片描述|${msg.cardData.description}]`;
                    case 'system': return msg.forAi ? `<系统>${msg.content}</系统>` : '';
                    case 'moment_forward': return msg.content;
                    default: return '';
                }
            };

            const buildHistoryBlock = (history, title, turnLimit) => {
                if (!history || history.length === 0) return '';
                const relevantHistory = history.filter(m => m.segmentType !== 'essay');
                if (relevantHistory.length === 0) return '';
                let promptHistoryTurns = [];
                for (const msg of relevantHistory) {
                    const sender = (msg.type === 'sent') ? myProfile : allContacts.find(c => c.id === msg.senderId);
                    if (!sender && msg.segmentType !== 'system') continue;
                    const senderName = sender ? sender.name : '系统';
                    const formattedContent = formatMessageContent(msg, senderName, myProfile.name);

                    if (!formattedContent) continue;

                    const role = msg.type === 'sent' ? 'player' : 'ai';
                    if (promptHistoryTurns.length > 0 && promptHistoryTurns[promptHistoryTurns.length - 1].role === role) {
                        promptHistoryTurns[promptHistoryTurns.length - 1].content += formattedContent;
                    } else {
                        promptHistoryTurns.push({ role: role, time: Utils.formatTimestampForPrompt(msg.timestamp), content: formattedContent });
                    }
                }
                const finalTurns = turnLimit ? promptHistoryTurns.slice(-turnLimit) : promptHistoryTurns;
                if (finalTurns.length === 0) return '';
                const historyJsonString = finalTurns.map(turn => JSON.stringify(turn)).join('\n');
                return `--- ${title} ---\n${historyJsonString}\n`;
            };


            const now = new Date();
            const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            const systemTime = `当前系统时间是：${Utils.formatTimestampForPrompt(now)}，${weekdays[now.getDay()]}。`;

            let taskPrompt = '';
            let characterInfoPrompt = '';
            let chatEntity;
            if (isGroup) {
                chatEntity = await DBHelper.get('groups', chatId);
                const members = chatEntity.members.map(id => allContacts.find(c => c.id === id)).filter(Boolean);
                taskPrompt = `你现在正在一个名为“${chatEntity.name}”的群聊中，需要同时扮演以下几位角色：${members.map(m => m.name).join('、')}。你的任务是根据每个角色的性格设定，与群里的“${myProfile.name}”（也就是玩家）进行互动。`;
                characterInfoPrompt = `群聊成员资料如下：\n` + members.map(m =>
                    `角色名: ${m.name}\n性别: ${m.gender}\n喜好: ${m.likes || '无'}\n厌恶: ${m.dislikes || '无'}\n习惯: ${m.habits || '无'}\n背景: ${m.background || '无'}`
                ).join('\n---\n');
            } else {
                chatEntity = await DBHelper.get('contacts', chatId);
                taskPrompt = `你现在正在扮演“${chatEntity.name}”，与“${myProfile.name}”（也就是玩家）进行一对一私聊。`;
                characterInfoPrompt = `你的角色资料如下：\n角色名: ${chatEntity.name}\n性别: ${chatEntity.gender}\n喜好: ${chatEntity.likes || '无'}\n厌恶: ${chatEntity.dislikes || '无'}\n习惯: ${chatEntity.habits || '无'}\n背景: ${chatEntity.background || '无'}`;
            }
            const playerInfoPrompt = `玩家（“${myProfile.name}”）的信息如下：\n性别: ${myProfile.gender}\n背景: ${myProfile.background || '无'}`;


            let historyPrompt = "以下是聊天记录，请结合上下文进行回复（每行是一个JSON对象，代表一个回合）：\n";
            const historyLength = chatSettings.historyLength || 20;

            if (chatSettings.memoryInterconnection) {
                if (isGroup) {
                    const group = chatEntity;
                    const members = group.members.map(id => allContacts.find(c => c.id === id)).filter(Boolean);
                    let privateContext = '--- 以下是各角色的私聊记忆 (仅角色自己可见) ---\n';
                    for (const member of members) {
                        const privateChat = await DBHelper.get('chats', member.id);
                        if (privateChat && privateChat.history) {
                            privateContext += buildHistoryBlock(privateChat.history, `与 ${member.name} 的私聊记录`, 10);
                        }
                    }
                    historyPrompt += privateContext;
                    historyPrompt += buildHistoryBlock(chatData?.history, '当前群聊记录', historyLength);

                } else {
                    const contact = chatEntity;
                    const relatedGroups = allGroups.filter(g => g.members.includes(contact.id));
                    let groupContext = '--- 以下是相关的群聊记忆 ---\n';
                    for (const group of relatedGroups) {
                        const groupChat = await DBHelper.get('chats', group.id);
                        if (groupChat && groupChat.history) {
                            groupContext += buildHistoryBlock(groupChat.history, `群聊“${group.name}”的记录`, 8);
                        }
                    }
                    historyPrompt += groupContext;
                    historyPrompt += buildHistoryBlock(chatData?.history, '当前私聊记录', historyLength);
                }
            } else {
                historyPrompt += buildHistoryBlock(chatData?.history, '当前聊天记录', historyLength);
            }


            let customPromptsSection = '';
            if (shouldSendFullPrompt && chatEntity && chatEntity.boundPromptFolderIds && chatEntity.boundPromptFolderIds.length > 0) {
                const allFolders = await DBHelper.getAll('promptFolders');
                const allPrompts = await DBHelper.getAll('prompts');
                const playerLastMessage = chatData.history.filter(m => m.type === 'sent').pop()?.content || '';

                const activeBoundFolders = allFolders.filter(f => chatEntity.boundPromptFolderIds.includes(f.id) && f.isActive);

                if (activeBoundFolders.length > 0) {
                    const activeBoundFolderIds = activeBoundFolders.map(f => f.id);
                    const relevantPrompts = allPrompts.filter(p => activeBoundFolderIds.includes(p.folderId) && p.isActive);

                    const promptsToInject = [];
                    for (const prompt of relevantPrompts) {
                        if (prompt.type === 'explicit') {
                            promptsToInject.push(prompt.content);
                        } else if (prompt.type === 'implicit') {
                            try {
                                const keywords = JSON.parse(prompt.keywords);
                                if (Array.isArray(keywords) && keywords.some(kw => playerLastMessage.includes(kw))) {
                                    promptsToInject.push(prompt.content);
                                }
                            } catch (e) { console.error(`解析关键词失败 (Prompt ID: ${prompt.id}):`, e); }
                        }
                    }

                    if (promptsToInject.length > 0) {
                        customPromptsSection = `\n--- 其他资料 ---\n${promptsToInject.join('\n\n')}\n---`;
                    }
                }
            }


            const formatPrompt = AIHandler.formatPromptTpl.replace('{PLAYER_NAME}', myProfile.name);


            const promptParts = [
                systemTime,
                taskPrompt,
                characterInfoPrompt,
                playerInfoPrompt
            ];


            if (shouldSendFullPrompt) {
                promptParts.push(customPromptsSection);

                chatData.turnCountSinceLastPrompt = 0;
                await DBHelper.put('chats', chatData);
            }


            promptParts.push(historyPrompt, extraEmojiHintPrompt, formatPrompt);

            let finalPrompt = promptParts.filter(Boolean).join('\n\n');

            if (isGroup) {
                finalPrompt += AIHandler.groupChatRules;
            }

            console.log(`--- PROMPT SENT TO AI (Full: ${shouldSendFullPrompt}) ---\n`, finalPrompt);

            return finalPrompt;
        },

        async getApiResponse(prompt, signal) {
            const { provider, url, key, model, temperature } = this.apiConfig;
            if (!key || !url || !model) {
                throw new Error('API配置不完整，请在设置中检查。');
            }

            let apiUrl = url;
            let headers = { 'Content-Type': 'application/json' };
            let body;

            const messagesForApi = [{ role: 'user', content: prompt }];

            if (['siliconflow', 'paioupu', 'volcano', 'custom'].includes(provider)) {
                headers['Authorization'] = `Bearer ${key}`;
                if (!apiUrl.endsWith('/chat/completions')) {
                    apiUrl = apiUrl.endsWith('/') ? `${apiUrl}chat/completions` : `${apiUrl}/chat/completions`;
                }
                body = { model: model, messages: messagesForApi, temperature: temperature };
            } else if (provider === 'gemini') {
                apiUrl += `${model}:generateContent?key=${key}`;
                body = {
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: { temperature: temperature }
                };
            } else {
                throw new Error('不支持的API提供商。');
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
                signal: signal
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API请求失败: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();

            if (provider === 'gemini') {
                return data.candidates[0].content.parts[0].text;
            } else {
                return data.choices[0].message.content;
            }
        },

        async handleAiReplyRequest() {
            if (this.isAwaitingResponse) return;

            this.isAwaitingResponse = true;
            this.abortController = new AbortController();


            aiRequestBtn.innerHTML = '<i class="fas fa-stop-circle"></i>';
            aiRequestBtn.disabled = false;

            const prompt = await this.buildPrompt();
            if (!prompt) {
                this.showError("无法构建prompt");
                this.isAwaitingResponse = false;
                aiRequestBtn.innerHTML = '<i class="fas fa-feather-alt"></i>';
                return;
            }

            const isGroup = appState.currentChatId.startsWith('group-');
            let typingBubbleId = Utils.generateId('typing');
            let typingTarget;

            if (isGroup) {
                typingTarget = await DBHelper.get('groups', appState.currentChatId);
                if (typingTarget) {
                    UIManager.addMessageToDOM({ type: 'received', messageId: typingBubbleId, isGroupTyping: true }, typingTarget, true);
                }
            } else {
                chatTypingIndicator.style.display = 'block';
                typingTarget = await DBHelper.get('contacts', appState.currentChatId);
                if (typingTarget) {
                    UIManager.addMessageToDOM({ type: 'received', messageId: typingBubbleId }, typingTarget, true);
                }
            }

            try {

                const aiRawResponse = await this.getApiResponse(prompt, this.abortController.signal);
                console.log("--- AI 原始回复 ---\n", aiRawResponse);
                await this.parseAndDisplayAIResponse(aiRawResponse);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log("AI请求已被用户取消。");
                } else {
                    console.error("AI回复失败:", error);
                    this.showError(`AI回复失败: ${error.message}`);
                }
            } finally {
                this.isAwaitingResponse = false;
                this.abortController = null;

                if (!isGroup) chatTypingIndicator.style.display = 'none';
                if (typingBubbleId) {
                    const typingBubble = $(`#${typingBubbleId}`);
                    if (typingBubble) typingBubble.remove();
                }
                aiRequestBtn.innerHTML = '<i class="fas fa-feather-alt"></i>';
            }
        },
        cancelAiRequest() {
            if (this.abortController) {
                this.abortController.abort();
                console.log("正在取消AI请求...");
            }
        },
        async handleActiveReplyRequest(lastAiTimestamp) {
            if (this.isAwaitingResponse) return;

            this.isAwaitingResponse = true;
            this.abortController = new AbortController();

            aiRequestBtn.innerHTML = '<i class="fas fa-stop-circle"></i>';
            aiRequestBtn.disabled = false;

            const prompt = await this.buildActiveReplyPrompt(lastAiTimestamp);
            if (!prompt) {
                this.showError("无法构建主动回复prompt");
                this.isAwaitingResponse = false;
                aiRequestBtn.innerHTML = '<i class="fas fa-feather-alt"></i>';
                return;
            }

            const isGroup = appState.currentChatId.startsWith('group-');
            let typingBubbleId = Utils.generateId('typing');
            let typingTarget;

            if (isGroup) {
                typingTarget = await DBHelper.get('groups', appState.currentChatId);
                if (typingTarget) {
                    UIManager.addMessageToDOM({ type: 'received', messageId: typingBubbleId, isGroupTyping: true }, typingTarget, true);
                }
            } else {
                chatTypingIndicator.style.display = 'block';
                typingTarget = await DBHelper.get('contacts', appState.currentChatId);
                if (typingTarget) {
                    UIManager.addMessageToDOM({ type: 'received', messageId: typingBubbleId }, typingTarget, true);
                }
            }

            try {
                const aiRawResponse = await this.getApiResponse(prompt, this.abortController.signal);
                console.log("--- AI 主动回复 (原始) ---\n", aiRawResponse);
                await this.parseAndDisplayActiveAIResponse(aiRawResponse);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log("AI主动回复请求已被用户取消。");
                } else {
                    console.error("AI主动回复失败:", error);
                    this.showError(`AI主动回复失败: ${error.message}`);
                }
            } finally {
                this.isAwaitingResponse = false;
                this.abortController = null;

                if (!isGroup) chatTypingIndicator.style.display = 'none';
                if (typingBubbleId) {
                    const typingBubble = $(`#${typingBubbleId}`);
                    if (typingBubble) typingBubble.remove();
                }
                aiRequestBtn.innerHTML = '<i class="fas fa-feather-alt"></i>';
            }
        },

        async buildActiveReplyPrompt(lastAiTimestamp) {
            const chatId = appState.currentChatId;
            if (!chatId) return null;


            const myProfile = await DBHelper.get('profile', 'myProfile');
            const allContacts = await DBHelper.getAll('contacts');
            const allGroups = await DBHelper.getAll('groups');
            const isGroup = chatId.startsWith('group-');
            const chatEntity = await DBHelper.get(isGroup ? 'groups' : 'contacts', chatId);
            const chatData = await DBHelper.get('chats', chatId) || { chatId, history: [], lastAiReplyTimestamp: 0 };
            const chatSettings = await DBHelper.get('apiConfig', 'chatSettings') || {};
            const historyLength = chatSettings.historyLength || 20;


            const now = Date.now();
            const lastDate = new Date(lastAiTimestamp);
            const elapsedMillis = now - lastAiTimestamp;
            const elapsedHours = Math.floor(elapsedMillis / (1000 * 60 * 60));
            const elapsedMinutes = Math.floor((elapsedMillis % (1000 * 60 * 60)) / (1000 * 60));
            const lastTimeFormatted = `${lastDate.getMonth() + 1}月${lastDate.getDate()}日 ${String(lastDate.getHours()).padStart(2, '0')}:${String(lastDate.getMinutes()).padStart(2, '0')}`;
            const durationString = `${elapsedHours > 0 ? `${elapsedHours}小时` : ''}${elapsedMinutes}分钟`;


            let situationPrompt = '';
            if (isGroup) {
                situationPrompt = `你们上次聊天是${lastTimeFormatted}，距离现在过去${durationString}了，在这段时间内，玩家“${myProfile.name}”并不在线，你们可以自由交流，交流内容可以与玩家有关，也可以与玩家无关。`;
            } else {
                situationPrompt = `“${myProfile.name}”上次和你聊天时间是${lastTimeFormatted}，距离现在已经过去了${durationString}。请你根据你的人设，说一些在这段时间里你可能会对“${myProfile.name}”说的话，也可能是这段时间内你遇到的新鲜的事，想和TA分享。这些话不一定是同一时间发的，有时候只隔了一两分钟，有可能你可能隔了十几二十分钟才发下一条，所以注意消息的口吻。禁止超出这个时间范围，禁止出现比现在时间还要晚的时间，如果对方离开的时间只有几个小时或者只是晚上到白天(睡觉)，可以不用发很多条消息。`;
            }


            const formatMessageContent = (msg, senderName, myName) => {
                if (msg.isRetracted) return `{${(msg.type === 'sent') ? myName : senderName}|${msg.content}}`;
                if (msg.segmentType === 'inner_voice') return `【心声|${senderName}|${msg.content}】`;
                switch (msg.segmentType) {
                    case 'text': return `[${senderName}|${msg.content}]`;
                    case 'emoji-image': return `<${senderName}|${msg.content}>`;
                    case 'voice': return `[${senderName}|语音|${msg.cardData.duration}|${msg.cardData.content}]`;
                    case 'quote': return `[${senderName}|引用|${msg.cardData.quotedName}|${msg.cardData.quotedContent}|${msg.cardData.newContent}]`;
                    case 'transfer': return `[${senderName}|转账|${msg.cardData.recipientName}|${msg.cardData.amount}|${msg.cardData.note || ''}]`;
                    case 'red-packet': return `[${senderName}|红包|${msg.cardData.title}|￥${msg.cardData.amount.toFixed(2)}|${msg.cardData.count}]`;
                    case 'image_simulated': return `[${senderName}|图片描述|${msg.cardData.description}]`;
                    case 'system': return msg.forAi ? `<系统>${msg.content}</系统>` : '';
                    case 'moment_forward': return msg.content;
                    default: return '';
                }
            };
            const buildHistoryBlock = (history, title, turnLimit) => {
                if (!history || history.length === 0) return '';
                let promptHistoryTurns = [];
                for (const msg of history.filter(m => m.segmentType !== 'essay')) {
                    const sender = (msg.type === 'sent') ? myProfile : allContacts.find(c => c.id === msg.senderId);
                    if (!sender && msg.segmentType !== 'system') continue;
                    const formattedContent = formatMessageContent(msg, sender ? sender.name : '系统', myProfile.name);
                    if (!formattedContent) continue;
                    const role = msg.type === 'sent' ? 'player' : 'ai';
                    if (promptHistoryTurns.length > 0 && promptHistoryTurns[promptHistoryTurns.length - 1].role === role) {
                        promptHistoryTurns[promptHistoryTurns.length - 1].content += formattedContent;
                    } else {
                        promptHistoryTurns.push({ role: role, time: Utils.formatTimestampForPrompt(msg.timestamp), content: formattedContent });
                    }
                }
                const finalTurns = turnLimit ? promptHistoryTurns.slice(-turnLimit) : promptHistoryTurns;
                if (finalTurns.length === 0) return '';
                return `--- ${title} ---\n${finalTurns.map(turn => JSON.stringify(turn)).join('\n')}\n`;
            };

            let historyPrompt = "作为参考，以下是你们之前的聊天记录：\n";
            if (chatSettings.memoryInterconnection) {
                if (isGroup) {
                    historyPrompt += buildHistoryBlock(chatData.history, '当前群聊记录', historyLength);
                    let privateContext = '--- 以下是各角色的私聊记忆 (仅角色自己可见) ---\n';
                    for (const member of chatEntity.members.map(id => allContacts.find(c => c.id === id)).filter(Boolean)) {
                        const privateChat = await DBHelper.get('chats', member.id);
                        if (privateChat && privateChat.history) privateContext += buildHistoryBlock(privateChat.history, `与 ${member.name} 的私聊记录`, 10);
                    }
                    historyPrompt += privateContext;
                } else {
                    historyPrompt += buildHistoryBlock(chatData.history, '当前私聊记录', historyLength);
                    const relatedGroups = allGroups.filter(g => g.members.includes(chatEntity.id));
                    let groupContext = '--- 以下是相关的群聊记忆 ---\n';
                    for (const group of relatedGroups) {
                        const groupChat = await DBHelper.get('chats', group.id);
                        if (groupChat && groupChat.history) groupContext += buildHistoryBlock(groupChat.history, `群聊“${group.name}”的记录`, 8);
                    }
                    historyPrompt += groupContext;
                }
            } else {
                historyPrompt += buildHistoryBlock(chatData.history, '当前聊天记录', historyLength);
            }


            const taskPrompt = isGroup ?
                `你现在正在一个名为“${chatEntity.name}”的群聊中，需要同时扮演以下几位角色：${chatEntity.members.map(id => allContacts.find(c => c.id === id)?.name).filter(Boolean).join('、')}。` :
                `你现在正在扮演“${chatEntity.name}”，与“${myProfile.name}”进行一对一私聊。`;

            const characterInfoPrompt = isGroup ?
                `群聊成员资料如下：\n` + chatEntity.members.map(id => allContacts.find(c => c.id === id)).filter(Boolean).map(m => `角色名: ${m.name}\n性别: ${m.gender}\n背景: ${m.background || '无'}`).join('\n---\n') :
                `你的角色资料如下：\n角色名: ${chatEntity.name}\n性别: ${chatEntity.gender}\n背景: ${chatEntity.background || '无'}`;


            const finalPrompt = [
                situationPrompt,
                taskPrompt,
                characterInfoPrompt,
                historyPrompt,
                AIHandler.activeReplyPromptTpl.replace('{PLAYER_NAME}', myProfile.name)
            ].join('\n\n');

            console.log(`--- ACTIVE REPLY PROMPT SENT TO AI ---\n`, finalPrompt);
            return finalPrompt;
        },
        async handleRegenerateRequest(messageId) {
            const confirmation = await new Promise(resolve => {
                UIManager.showModal({
                    title: "重新生成回复",
                    body: "<p>你确定要让AI重新生成上一条回复吗？这会删除AI的最新几条消息。</p>",
                    actions: [
                        { text: '取消', class: 'btn-secondary', handler: () => { UIManager.hideModal(); resolve(false); } },
                        { text: '确定', class: 'btn-primary', handler: () => { UIManager.hideModal(); resolve(true); } }
                    ]
                });
            });

            if (!confirmation) return;

            const chatId = appState.currentChatId;
            const chatData = await DBHelper.get('chats', chatId);
            if (!chatData || !chatData.history) return;

            const playerMessageIndex = chatData.history.findIndex(m => m.messageId === messageId);
            if (playerMessageIndex === -1) return;

            const messagesToDelete = [];
            for (let i = playerMessageIndex + 1; i < chatData.history.length; i++) {
                if (chatData.history[i].type === 'received') {
                    messagesToDelete.push(chatData.history[i].messageId);
                }
            }


            chatData.history = chatData.history.filter(m => !messagesToDelete.includes(m.messageId));
            await DBHelper.put('chats', chatData);
            await UIManager.refreshChatView();


            const myProfile = await DBHelper.get('profile', 'myProfile');
            const regenerationInstruction = `\n---
紧急指令：玩家（“${myProfile.name}”）要求你重新生成刚才的回复，因为你之前的回复可能“不符合角色性格(OOC)”或“未使用正确的格式”。请你仔细复核你的角色设定和所有回复规则，然后给出一个更优质的回复。
---`;

            const basePrompt = await this.buildPrompt();
            const newPrompt = basePrompt + regenerationInstruction;


            this.isAwaitingResponse = true;
            this.abortController = new AbortController();
            aiRequestBtn.innerHTML = '<i class="fas fa-stop-circle"></i>';
            aiRequestBtn.disabled = false;

            const isGroup = chatId.startsWith('group-');
            let typingTarget;
            const typingBubbleId = Utils.generateId('typing');

            if (isGroup) {
                typingTarget = await DBHelper.get('groups', chatId);
                if (typingTarget) {

                    await UIManager.addMessageToDOM({ type: 'received' }, typingTarget, true);

                    const typingBubbles = $$('.bubble-typing');
                    if (typingBubbles.length > 0) typingBubbles[typingBubbles.length - 1].closest('.message-row').id = typingBubbleId;
                }
            } else {
                chatTypingIndicator.style.display = 'block';
                typingTarget = await DBHelper.get('contacts', appState.currentChatId);
                if (typingTarget) {
                    await UIManager.addMessageToDOM({ type: 'received' }, typingTarget, true);
                    const typingBubbles = $$('.bubble-typing');
                    if (typingBubbles.length > 0) typingBubbles[typingBubbles.length - 1].closest('.message-row').id = typingBubbleId;
                }
            }

            try {
                const aiRawResponse = await this.getApiResponse(newPrompt, this.abortController.signal);
                console.log("--- AI 原始回复 ---\n", aiRawResponse);

                const typingBubble = $(`#${typingBubbleId}`);
                if (typingBubble) typingBubble.remove();
                if (!isGroup) chatTypingIndicator.style.display = 'none';

                await this.parseAndDisplayAIResponse(aiRawResponse);
            } catch (error) {
                if (error.name !== 'AbortError') this.showError(`AI回复失败: ${error.message}`);
            } finally {
                this.isAwaitingResponse = false;
                this.abortController = null;

                const typingBubble = $(`#${typingBubbleId}`);
                if (typingBubble) typingBubble.remove();
                if (!isGroup) chatTypingIndicator.style.display = 'none';
                aiRequestBtn.innerHTML = '<i class="fas fa-feather-alt"></i>';
            }
        },
        async handleOpeningSceneRequest(scene) {
            if (this.isAwaitingResponse) return;

            this.isAwaitingResponse = true;
            this.abortController = new AbortController();

            aiRequestBtn.innerHTML = '<i class="fas fa-stop-circle"></i>';
            aiRequestBtn.disabled = false;


            const myProfile = await DBHelper.get('profile', 'myProfile');
            const allContacts = await DBHelper.getAll('contacts');

            let taskPrompt, characterInfoPrompt, finalPrompt;
            const isGroup = !!scene.groupId;
            const chatId = isGroup ? scene.groupId : scene.contactId;

            if (isGroup) {
                const group = await DBHelper.get('groups', scene.groupId);
                const members = group.members.map(id => allContacts.find(c => c.id === id)).filter(Boolean);
                taskPrompt = `你现在正在一个名为“${group.name}”的群聊中，需要同时扮演以下几位角色：${members.map(m => m.name).join('、')}。`;
                characterInfoPrompt = `群聊成员资料如下：\n` + members.map(m => `角色名: ${m.name}\n性别: ${m.gender}\n喜好: ${m.likes || '无'}\n厌恶: ${m.dislikes || '无'}\n习惯: ${m.habits || '无'}\n背景: ${m.background || '无'}`).join('\n---\n');
            } else {
                const contact = await DBHelper.get('contacts', scene.contactId);
                taskPrompt = `你现在正在扮演“${contact.name}”，与“${myProfile.name}”（也就是玩家）进行一对一私聊。`;
                characterInfoPrompt = `你的角色资料如下：\n角色名: ${contact.name}\n性别: ${contact.gender}\n喜好: ${contact.likes || '无'}\n厌恶: ${contact.dislikes || '无'}\n习惯: ${contact.habits || '无'}\n背景: ${contact.background || '无'}`;
            }

            const playerInfoPrompt = `玩家（“${myProfile.name}”）的信息如下：\n性别: ${myProfile.gender}\n背景: ${myProfile.background || '无'}`;
            const openingInstruction = `\n---
紧急指令：这是一个全新的开场。请根据以下“开场白”内容，让角色开始对话，营造出开场氛围。不要提及“开场白”这三个字，直接开始表演。
开场白内容：
“${scene.content}”
---`;
            const formatPrompt = AIHandler.formatPromptTpl.replace('{PLAYER_NAME}', myProfile.name);

            if (isGroup) {
                finalPrompt = [taskPrompt, characterInfoPrompt, playerInfoPrompt, openingInstruction, formatPrompt, AIHandler.groupChatRules].join('\n\n');
            } else {
                finalPrompt = [taskPrompt, characterInfoPrompt, playerInfoPrompt, openingInstruction, formatPrompt].join('\n\n');
            }

            console.log("--- OPENING SCENE PROMPT SENT TO AI ---\n", finalPrompt);

            const typingTarget = await DBHelper.get(isGroup ? 'groups' : 'contacts', chatId);
            const typingBubbleId = Utils.generateId('typing');
            if (typingTarget) {
                if (isGroup) {
                    UIManager.addMessageToDOM({ type: 'received', messageId: typingBubbleId, isGroupTyping: true }, typingTarget, true);
                } else {
                    chatTypingIndicator.style.display = 'block';
                    UIManager.addMessageToDOM({ type: 'received', messageId: typingBubbleId }, typingTarget, true);
                }
            }

            try {
                const aiRawResponse = await this.getApiResponse(finalPrompt, this.abortController.signal);
                console.log("--- AI 原始回复 ---\n", aiRawResponse);
                await this.parseAndDisplayAIResponse(aiRawResponse);
            } catch (error) {
                if (error.name !== 'AbortError') this.showError(`AI回复失败: ${error.message}`);
            } finally {
                this.isAwaitingResponse = false;
                this.abortController = null;
                const typingBubble = $(`#${typingBubbleId}`);
                if (typingBubble) typingBubble.remove();
                if (!isGroup) chatTypingIndicator.style.display = 'none';
                aiRequestBtn.innerHTML = '<i class="fas fa-feather-alt"></i>';
            }
        },

        async parseAndDisplayAIResponse(text) {
            const contacts = await DBHelper.getAll('contacts');
            const currentChatData = await DBHelper.get('chats', appState.currentChatId) || { chatId: appState.currentChatId, history: [] };
            const displayableMessages = [];
            let newGroupNameFromAI = null;

            const createBaseMessage = (senderName) => {
                const sender = contacts.find(c => c.name === senderName);
                if (!sender) {
                    console.warn(`未在通讯录中找到名为 "${senderName}" 的角色，跳过此消息。`);
                    return null;
                }
                return {
                    messageId: Utils.generateId('msg'),
                    senderId: sender.id,
                    timestamp: Date.now(),
                    type: 'received',
                    isUnread: false,
                    senderInfo: sender,
                };
            };

            const allMessageRegex = /<系统>([\s\S]*?)<\/系统>|<私聊>([\s\S]*?)<\/私聊>|『([^』]+?)』|【([^】]+?)】|「([^」]+?)」|{([^{}]+?)}|\[([^\[\]]+?)\]|<((?!系统|私聊)[^>]+?)>/g;

            text.replace(allMessageRegex, (match, systemContent, privateContent, cardContent, innerVoiceContent, essayContent, retractedContent, standardContent, emojiContent) => {

                if (systemContent !== undefined) {
                    const content = systemContent.trim();
                    const nameChangeParts = content.match(/(.+?)\s*修改群名为\s*(.*)$/);
                    if (nameChangeParts && nameChangeParts.length === 3) {
                        const rawNewName = nameChangeParts[2].trim();
                        const parsedNewName = rawNewName.replace(/^["“]|["”]$/g, '');
                        newGroupNameFromAI = parsedNewName;

                        const systemMessage = {
                            messageId: Utils.generateId('msg'),
                            content: `${nameChangeParts[1].trim()} 修改群名为 ${parsedNewName}`,
                            timestamp: Date.now(),
                            type: 'received',
                            segmentType: 'system',
                            forAi: true
                        };
                        currentChatData.history.push(systemMessage);
                        displayableMessages.push(systemMessage);
                    }
                } else if (privateContent !== undefined) {
                    const innerMatch = privateContent.match(/\[([^|]+?)\|(.+?)\]/);
                    if (innerMatch) {
                        const senderName = innerMatch[1].trim();
                        const msgContent = innerMatch[2].trim();
                        const sender = contacts.find(c => c.name === senderName);
                        if (sender) {
                            (async () => {
                                const privateChatData = await DBHelper.get('chats', sender.id) || { chatId: sender.id, history: [] };
                                const privateMessage = {
                                    messageId: Utils.generateId('msg'),
                                    senderId: sender.id,
                                    content: msgContent,
                                    timestamp: Date.now(),
                                    type: 'received',
                                    isUnread: true,
                                    isPrivateInGroup: true,
                                    senderInfo: sender,
                                    segmentType: 'text'
                                };
                                privateChatData.history.push(privateMessage);
                                await DBHelper.put('chats', privateChatData);
                                UIManager.showTopNotification(privateMessage);
                            })();
                        }
                    }
                } else if (cardContent !== undefined) {
                    const parts = cardContent.split('|').map(p => p.trim());
                    const [senderName, shareType, title, summary, details] = parts;
                    const baseMessage = createBaseMessage(senderName);
                    if (baseMessage) {
                        baseMessage.segmentType = 'card';
                        baseMessage.content = `[卡片] ${title}`;
                        baseMessage.cardData = { shareType, title, summary, details, isExpanded: false };
                        currentChatData.history.push(baseMessage);
                        displayableMessages.push(baseMessage);
                    }
                } else if (innerVoiceContent !== undefined) {
                    const parts = innerVoiceContent.split('|').map(p => p.trim());
                    const sender = contacts.find(c => c.name === parts[1]);
                    if (sender) {
                        currentChatData.history.push({ messageId: Utils.generateId('msg'), senderId: sender.id, content: parts[2], timestamp: Date.now(), type: 'received', isUnread: false, segmentType: 'inner_voice' });
                    }
                } else if (essayContent !== undefined) {
                    const parts = essayContent.split('|').map(p => p.trim());
                    const sender = contacts.find(c => c.name === parts[1]);
                    if (sender) {
                        currentChatData.history.push({ messageId: Utils.generateId('msg'), senderId: sender.id, content: parts[2], timestamp: Date.now(), type: 'received', isUnread: false, segmentType: 'essay' });
                        UIManager.showEssayNotification(sender.remark || sender.name, sender.id);
                    }
                } else {
                    let bracketType;
                    let innerContent;

                    if (retractedContent !== undefined) { bracketType = '{'; innerContent = retractedContent; }
                    else if (standardContent !== undefined) { bracketType = '['; innerContent = standardContent; }
                    else if (emojiContent !== undefined) { bracketType = '<'; innerContent = emojiContent; }
                    else { return; }

                    const parts = innerContent.split('|').map(p => p.trim());
                    const [senderName] = parts;
                    const baseMessage = createBaseMessage(senderName);
                    if (!baseMessage) return;

                    baseMessage.isRetracted = bracketType === '{';
                    baseMessage.toBeRetracted = bracketType === '{';

                    if (bracketType === '<') {
                        baseMessage.segmentType = 'emoji-image';
                        baseMessage.content = parts[1];
                    } else if (parts.length === 2) {
                        baseMessage.segmentType = 'text';
                        baseMessage.content = parts[1];
                    } else if (parts[1] === '领取转账') {
                        baseMessage.segmentType = 'transfer-receipt';
                        baseMessage.content = `${parts[2]}已收款${parts[3]}`;
                        baseMessage.cardData = { recipientName: parts[0], senderName: parts[2], amount: parts[3] };
                    } else if (parts[1] === '语音') {
                        baseMessage.segmentType = 'voice';
                        baseMessage.content = `[语音] ${parts[3]}`;
                        baseMessage.cardData = { duration: parts[2], content: parts[3] };
                    } else if (parts[1] === '引用') {
                        baseMessage.segmentType = 'quote';
                        baseMessage.content = `[引用] ${parts[4]}`;
                        baseMessage.cardData = { quotedName: parts[2], quotedContent: parts[3], newContent: parts[4] };
                    } else if (parts[1] === '转账') {
                        baseMessage.segmentType = 'transfer';
                        baseMessage.content = `[转账] ${parts[3]}`;
                        baseMessage.cardData = { recipientName: parts[2], amount: parts[3], note: parts[4], isClaimed: false };
                    } else if (parts[1] === '红包') {
                        baseMessage.segmentType = 'red-packet';
                        baseMessage.content = `[红包] ${parts[2]}`;
                        baseMessage.cardData = { title: parts[2], amount: parseFloat(parts[3].replace('￥', '')), count: parseInt(parts[4]), claimedBy: [] };
                    }

                    if (baseMessage.segmentType) {
                        currentChatData.history.push(baseMessage);
                        displayableMessages.push(baseMessage);
                    }
                }
            });

            if (newGroupNameFromAI && appState.currentChatId.startsWith('group-')) {
                const group = await DBHelper.get('groups', appState.currentChatId);
                if (group) {
                    group.name = newGroupNameFromAI;
                    await DBHelper.put('groups', group);
                    chatTitle.textContent = newGroupNameFromAI;
                }
            }

            if (displayableMessages.length > 0) {
                currentChatData.lastAiReplyTimestamp = Date.now();
            }

            await DBHelper.put('chats', currentChatData);

            for (const msg of displayableMessages) {
                await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 200));

                if (msg.segmentType === 'system') {
                    const notice = document.createElement('div');
                    notice.className = 'system-notice';
                    notice.id = msg.messageId;
                    notice.textContent = msg.content;
                    chatArea.appendChild(notice);
                    chatArea.scrollTop = chatArea.scrollHeight;
                    continue;
                }

                UIManager.addMessageToDOM(msg, msg.senderInfo, false, true);

                if (msg.toBeRetracted) {
                    const retractDelay = Math.random() * 1000 + 1000;
                    setTimeout(async () => {
                        const chatToUpdate = await DBHelper.get('chats', appState.currentChatId);
                        const msgToRetract = chatToUpdate.history.find(m => m.messageId === msg.messageId);
                        if (msgToRetract) {
                            msgToRetract.isRetracted = true;
                            await DBHelper.put('chats', chatToUpdate);
                            const bubbleEl = $(`#${msg.messageId}`);
                            if (bubbleEl) {
                                const retractionNotice = UIManager.createRetractionNotice(msgToRetract, msg.senderInfo);
                                bubbleEl.replaceWith(retractionNotice);
                            }
                        }
                    }, retractDelay);
                }
            }
        },

        async parseAndDisplayActiveAIResponse(text) {
            const contacts = await DBHelper.getAll('contacts');
            const chatData = await DBHelper.get('chats', appState.currentChatId) || { chatId: appState.currentChatId, history: [] };
            const displayableMessages = [];

            const createBaseMessage = (senderName, displayTimestamp) => {
                const sender = contacts.find(c => c.name === senderName);
                if (!sender) {
                    console.warn(`未找到角色 "${senderName}"，跳过此主动回复消息。`);
                    return null;
                }
                return {
                    messageId: Utils.generateId('msg'),
                    senderId: sender.id,
                    timestamp: Date.now(),
                    type: 'received',
                    isUnread: false,
                    senderInfo: sender,
                    isAutoReply: true,
                    displayTimestamp: displayTimestamp,
                };
            };

            const allMessageRegex = /『([^』]+?)』|【([^】]+?)】|「([^」]+?)」|{([^{}]+?)}|\[([^\[\]]+?)\]|<([^>]+?)>/g;

            text.replace(allMessageRegex, (match, cardContent, innerVoiceContent, essayContent, retractedContent, standardContent, emojiContent) => {

                if (innerVoiceContent) {
                    const parts = innerVoiceContent.split('|').map(p => p.trim());
                    if (parts[0] === '心声' && parts.length === 3) {
                        const sender = contacts.find(c => c.name === parts[1]);
                        if (sender) {
                            chatData.history.push({ messageId: Utils.generateId('msg'), senderId: sender.id, content: parts[2], timestamp: Date.now(), type: 'received', segmentType: 'inner_voice' });
                        }
                    }
                    return;
                }
                if (essayContent) {
                    const parts = essayContent.split('|').map(p => p.trim());
                    if (parts[0] === '随笔' && parts.length === 3) {
                        const sender = contacts.find(c => c.name === parts[1]);
                        if (sender) {
                            chatData.history.push({ messageId: Utils.generateId('msg'), senderId: sender.id, content: parts[2], timestamp: Date.now(), type: 'received', segmentType: 'essay' });

                            UIManager.showEssayNotification(sender.remark || sender.name, sender.id);
                        }
                    }
                    return;
                }

                let parts, senderName, displayTimestamp, baseMessage;

                if (cardContent !== undefined) {
                    parts = cardContent.split('|').map(p => p.trim());
                    if (parts.length < 5) return;
                    senderName = parts[0];
                    displayTimestamp = parts.pop();
                    baseMessage = createBaseMessage(senderName, displayTimestamp);
                    if (baseMessage) {
                        baseMessage.segmentType = 'card';
                        baseMessage.content = `[卡片] ${parts[2]}`;
                        baseMessage.cardData = { shareType: parts[1], title: parts[2], summary: parts[3], details: parts[4], isExpanded: false };
                        chatData.history.push(baseMessage);
                        displayableMessages.push(baseMessage);
                    }
                } else {
                    let innerContent, bracketType;
                    if (retractedContent) { innerContent = retractedContent; bracketType = '{'; }
                    else if (standardContent) { innerContent = standardContent; bracketType = '['; }
                    else if (emojiContent) { innerContent = emojiContent; bracketType = '<'; }
                    else { return; }

                    parts = innerContent.split('|').map(p => p.trim());
                    if (parts.length < 2) return;

                    senderName = parts[0];
                    displayTimestamp = parts.pop();
                    baseMessage = createBaseMessage(senderName, displayTimestamp);
                    if (!baseMessage) return;


                    if (bracketType === '{') {
                        baseMessage.isRetracted = true;
                        baseMessage.toBeRetracted = true;
                    }

                    if (bracketType === '<') {
                        baseMessage.segmentType = 'emoji-image';
                        baseMessage.content = parts[1];
                    } else if (bracketType === '[') {
                        const typeKeyword = parts[1];
                        switch (typeKeyword) {
                            case '语音':
                                baseMessage.segmentType = 'voice';
                                baseMessage.content = `[语音] ${parts[3]}`;
                                baseMessage.cardData = { duration: parts[2], content: parts[3] };
                                break;
                            case '引用':
                                baseMessage.segmentType = 'quote';
                                baseMessage.content = `[引用] ${parts[4]}`;
                                baseMessage.cardData = { quotedName: parts[2], quotedContent: parts[3], newContent: parts[4] };
                                break;
                            case '转账':
                                baseMessage.segmentType = 'transfer';
                                baseMessage.content = `[转账] ${parts[3]}`;
                                baseMessage.cardData = { recipientName: parts[2], amount: parts[3], note: parts[4], isClaimed: false };
                                break;
                            case '红包':
                                baseMessage.segmentType = 'red-packet';
                                baseMessage.content = `[红包] ${parts[2]}`;
                                baseMessage.cardData = { title: parts[2], amount: parseFloat(parts[3].replace('￥', '')), count: parseInt(parts[4]), claimedBy: [] };
                                break;
                            default:
                                baseMessage.segmentType = 'text';
                                baseMessage.content = parts.slice(1).join('|');
                                break;
                        }
                    } else {
                        baseMessage.segmentType = 'text';
                        baseMessage.content = parts.slice(1).join('|');
                    }

                    if (baseMessage.segmentType) {
                        chatData.history.push(baseMessage);
                        displayableMessages.push(baseMessage);
                    }
                }
            });

            if (displayableMessages.length > 0 || chatData.history.some(m => m.segmentType === 'inner_voice' || m.segmentType === 'essay')) {
                chatData.lastAiReplyTimestamp = Date.now();
            }

            await DBHelper.put('chats', chatData);

            for (const msg of displayableMessages) {
                await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 200));
                UIManager.addMessageToDOM(msg, msg.senderInfo, false, true);


                if (msg.toBeRetracted) {
                    const retractDelay = Math.random() * 1000 + 1000;
                    setTimeout(async () => {
                        const chatToUpdate = await DBHelper.get('chats', appState.currentChatId);
                        const msgToRetract = chatToUpdate.history.find(m => m.messageId === msg.messageId);
                        if (msgToRetract) {
                            msgToRetract.isRetracted = true;
                            await DBHelper.put('chats', chatToUpdate);
                            const bubbleEl = $(`#${msg.messageId}`);
                            if (bubbleEl) {
                                const retractionNotice = UIManager.createRetractionNotice(msgToRetract, msg.senderInfo);
                                bubbleEl.replaceWith(retractionNotice);
                            }
                        }
                    }, retractDelay);
                }
            }
        },

        showError(message) {
            UIManager.showModal({
                title: "错误",
                body: `<p>${message}</p>`,
                actions: [{ text: '好的', class: 'btn-primary', handler: () => UIManager.hideModal() }]
            });
        },

        async handleMomentsRefreshRequest() {
            if (this.isAwaitingResponse) return;

            this.isAwaitingResponse = true;
            this.abortController = new AbortController();
            const refreshBtn = $('#moments-refresh-btn i');
            refreshBtn.classList.add('fa-spin');

            try {
                const prompt = await this.buildMomentsRefreshPrompt();
                if (!prompt) {
                    UIManager.showToast("无法生成动态：圈子信息不完整。");
                    return;
                }

                const aiRawResponse = await this.getApiResponse(prompt, this.abortController.signal);
                console.log("--- AI 朋友圈动态 (原始) ---\n", aiRawResponse);
                await this.parseAndDisplayMomentsResponse(aiRawResponse);


                const circle = await DBHelper.get('circles', appState.currentCircleId);
                if (circle) {
                    circle.lastRefreshed = Date.now();
                    await DBHelper.put('circles', circle);
                }

            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("朋友圈动态生成失败:", error);
                    this.showError(`动态生成失败: ${error.message}`);
                }
            } finally {
                this.isAwaitingResponse = false;
                this.abortController = null;
                refreshBtn.classList.remove('fa-spin');
            }
        },

        async handleMomentsCommentRequest(momentId) {
            if (this.isAwaitingResponse) return;

            this.isAwaitingResponse = true;
            this.abortController = new AbortController();
            const postElement = $(`[data-moment-id="${momentId}"]`);
            const commentsSection = postElement.querySelector('.post-interactions');


            let typingIndicator = commentsSection.querySelector('.post-comment-typing-indicator');
            if (!typingIndicator) {
                typingIndicator = document.createElement('div');
                typingIndicator.className = 'post-comment-typing-indicator';

                commentsSection.style.display = 'block';
                commentsSection.insertBefore(typingIndicator, commentsSection.querySelector('.comment-input-wrapper'));
            }
            typingIndicator.textContent = '朋友们正在赶来评论...';


            try {
                const prompt = await this.buildMomentsCommentPrompt(momentId);
                if (!prompt) return;

                const aiRawResponse = await this.getApiResponse(prompt, this.abortController.signal);
                console.log("--- AI 朋友圈评论 (原始) ---\n", aiRawResponse);
                await this.parseAndDisplayMomentsCommentsResponse(momentId, aiRawResponse);

            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("朋友圈评论生成失败:", error);
                }
            } finally {
                this.isAwaitingResponse = false;
                this.abortController = null;
                if (typingIndicator) typingIndicator.remove();
            }
        },

        async handleMomentsPlayerCommentResponse(momentId, playerComment) {
            if (this.isAwaitingResponse) return;

            this.isAwaitingResponse = true;
            this.abortController = new AbortController();
            const postElement = $(`[data-moment-id="${momentId}"]`);
            const commentsSection = postElement.querySelector('.post-interactions');

            let typingIndicator = commentsSection.querySelector('.post-comment-typing-indicator');
            if (!typingIndicator) {
                typingIndicator = document.createElement('div');
                typingIndicator.className = 'post-comment-typing-indicator';
                commentsSection.insertBefore(typingIndicator, commentsSection.querySelector('.comment-input-wrapper'));
            }
            typingIndicator.textContent = '朋友们正在赶来评论...';
            commentsSection.style.display = 'block';

            try {
                const prompt = await this.buildMomentsPlayerCommentPrompt(momentId, playerComment);
                if (!prompt) return;

                const aiRawResponse = await this.getApiResponse(prompt, this.abortController.signal);
                console.log("--- AI 朋友圈玩家评论回复 (原始) ---\n", aiRawResponse);
                await this.parseAndDisplayMomentsPlayerCommentResponse(momentId, aiRawResponse);

            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("朋友圈AI回复玩家评论失败:", error);
                }
            } finally {
                this.isAwaitingResponse = false;
                this.abortController = null;
                if (typingIndicator) typingIndicator.remove();
            }
        },

        async buildMomentsRefreshPrompt() {
            const circle = await DBHelper.get('circles', appState.currentCircleId);
            if (!circle || !circle.memberIds || circle.memberIds.length === 0) return null;

            const allContacts = await DBHelper.getAll('contacts');


            const validMemberIds = circle.memberIds.filter(id => allContacts.some(c => c.id === id));
            if (validMemberIds.length !== circle.memberIds.length) {
                circle.memberIds = validMemberIds;
                await DBHelper.put('circles', circle);
                UIManager.showToast("已自动移除圈子中不存在的好友。");
            }
            if (validMemberIds.length === 0) return null;


            const shuffled = validMemberIds.sort(() => 0.5 - Math.random());
            const numToSelect = Math.floor(Math.random() * 3) + 1;
            const selectedMemberIds = shuffled.slice(0, Math.min(numToSelect, validMemberIds.length));
            const selectedMembers = selectedMemberIds.map(id => allContacts.find(c => c.id === id));

            const myProfile = await DBHelper.get('profile', 'myProfile');
            const allGroups = await DBHelper.getAll('groups');


            const timeNow = new Date();
            const lastRefreshTime = new Date(circle.lastRefreshed || (Date.now() - 24 * 60 * 60 * 1000));
            const timePrompt = `现在是 ${timeNow.toLocaleString('zh-CN')}。上次生成动态的时间是 ${lastRefreshTime.toLocaleString('zh-CN')}。请确保本次生成的动态时间在此范围之内。`;

            const membersInfo = selectedMembers.map(m => `角色名: ${m.name}\n性别: ${m.gender}\n喜好: ${m.likes || '无'}\n厌恶: ${m.dislikes || '无'}\n习惯: ${m.habits || '无'}\n背景: ${m.background || '无'}`).join('\n---\n');
            const playerInfo = `玩家名: ${myProfile.name}\n性别: ${myProfile.gender}\n背景: ${myProfile.background || '无'}`;
            const extraMembersInfo = circle.extraMembers ? `这个圈子还有一些其他朋友：${circle.extraMembers}。` : '';

            let contextHistory = '';
            for (const member of selectedMembers) {
                const privateChat = await DBHelper.get('chats', member.id);
                if (privateChat && privateChat.history.length > 0) {
                    const turns = this.buildTurnsFromHistory(privateChat.history, allContacts, myProfile);
                    const lastTwoTurns = turns.slice(-2);
                    if (lastTwoTurns.length > 0) {
                        contextHistory += `与 ${member.name} 的最新私聊 (最多2轮):\n${lastTwoTurns.map(t => JSON.stringify(t)).join('\n')}\n`;
                    }
                }
                const groupsWithMember = allGroups.filter(g => g.members.includes(member.id));
                for (const group of groupsWithMember) {
                    const groupChat = await DBHelper.get('chats', group.id);
                    if (groupChat && groupChat.history.length > 0) {
                        const turns = this.buildTurnsFromHistory(groupChat.history, allContacts, myProfile);
                        const lastTwoTurns = turns.slice(-2);
                        if (lastTwoTurns.length > 0) {
                            contextHistory += `在群聊 ${group.name} 中 ${member.name} 的相关动态 (最多2轮):\n${lastTwoTurns.map(t => JSON.stringify(t)).join('\n')}\n`;
                        }
                    }
                }
            }
            const formatRules = `
---
朋友圈动态生成规则（非常重要！）：
1.  你将扮演 ${selectedMembers.map(m => m.name).join('、')} 这几位角色，并为他们生成朋友圈动态。
2.  严格按照以下格式，每条动态都必须被一个 <朋友圈> 标签包裹。
3.  动态格式: 【作者角色名：动态内容|动态时间(月/日 HH:mm)】
4.  点赞格式(强制要求): 在动态格式之后，另起一行，用中文括号包裹点赞列表，格式为（已点赞：张三,李四,王五）。点赞者可以是圈内任何AI角色、额外好友”。
5.  评论格式: 〖评论者角色名：评论内容〗禁止在〖〗内嵌套〖〗
6.  你可以让角色互相评论，也可以让圈子里的额外好友（${circle.extraMembers || '无'}）参与评论。
7.  动态内容要符合角色人设，可以图文并茂（用文字描述图片），也可以只是纯文字。
8.  生成1到4条不等的动态，内容不能重复。
9.  作者和评论者的角色名必须是角色的名字（例如：${selectedMembers.map(m => m.name).join(', ')}）、额外好友的名字或玩家的名字。
10. **严禁OOC，严禁生成格式之外的内容，严禁代替玩家进行评论或回复**。
11.举例：
<朋友圈>
【33：今天天气真不错，有没有要一起出去玩的？|7/3 8:36】
（已点赞：vv,入入）
〖vv：带我一个！〗
〖入入：我也要去——〗
</朋友圈>
---
`;

            const finalPrompt = [
                timePrompt,
                playerInfo,
                `--- 圈子里的AI角色 ---\n${membersInfo}`,
                extraMembersInfo,
                `--- 最近的聊天记录参考 ---\n${contextHistory}`,
                formatRules
            ].join('\n\n');

            console.log("--- MOMENTS REFRESH PROMPT --- \n", finalPrompt);
            return finalPrompt;
        },

        async buildMomentsCommentPrompt(momentId) {
            const moment = await DBHelper.get('moments', momentId);
            const circle = await DBHelper.get('circles', moment.circleId);
            if (!circle || !circle.memberIds || circle.memberIds.length === 0) return null;

            const allContacts = await DBHelper.getAll('contacts');
            const myProfile = await DBHelper.get('profile', 'myProfile');
            const allGroups = await DBHelper.getAll('groups'); // 新增：获取所有群聊信息

            // 准备角色资料
            const momentAuthor = allContacts.find(c => c.id === moment.authorId);
            const circleMembers = allContacts.filter(c => circle.memberIds.includes(c.id));
            const otherMembers = circleMembers.filter(c => c.id !== moment.authorId);
            const shuffled = otherMembers.sort(() => 0.5 - Math.random());
            const numToSelect = Math.floor(Math.random() * 3) + 1;
            const selectedRandomMembers = shuffled.slice(0, Math.min(numToSelect, otherMembers.length));

            let membersToProvideInfo = [];
            if (momentAuthor) { // 如果作者是AI角色
                membersToProvideInfo.push(momentAuthor);
            }
            membersToProvideInfo.push(...selectedRandomMembers);
            membersToProvideInfo = [...new Set(membersToProvideInfo)]; // 去重

            const membersInfo = membersToProvideInfo.map(m => `角色名: ${m.name}\n性别: ${m.gender}\n喜好: ${m.likes || '无'}\n厌恶: ${m.dislikes || '无'}\n习惯: ${m.habits || '无'}\n背景: ${m.background || '无'}`).join('\n---\n');

            // 新增：获取聊天记录上下文
            let contextHistory = '';
            for (const member of membersToProvideInfo) {
                const privateChat = await DBHelper.get('chats', member.id);
                if (privateChat && privateChat.history.length > 0) {
                    const turns = this.buildTurnsFromHistory(privateChat.history, allContacts, myProfile);
                    const lastTwoTurns = turns.slice(-2);
                    if (lastTwoTurns.length > 0) {
                        contextHistory += `与 ${member.name} 的最新私聊 (最多2轮):\n${lastTwoTurns.map(t => JSON.stringify(t)).join('\n')}\n`;
                    }
                }
                const groupsWithMember = allGroups.filter(g => g.members.includes(member.id));
                for (const group of groupsWithMember) {
                    const groupChat = await DBHelper.get('chats', group.id);
                    if (groupChat && groupChat.history.length > 0) {
                        const turns = this.buildTurnsFromHistory(groupChat.history, allContacts, myProfile);
                        const lastTwoTurns = turns.slice(-2);
                        if (lastTwoTurns.length > 0) {
                            contextHistory += `在群聊 ${group.name} 中 ${member.name} 的相关动态 (最多2轮):\n${lastTwoTurns.map(t => JSON.stringify(t)).join('\n')}\n`;
                        }
                    }
                }
            }

            const postContentText = `玩家“${myProfile.name}”发布了一条动态：\n“${moment.content}”`;

            const privateChatRules = `
---
私聊规则:
1.  如果你想让某位角色私聊玩家，请使用 <私聊></私聊> 标签包裹私聊内容。
2.  私聊内容格式可以是: [角色名|消息内容] 或 {角色名|撤回内容} 或 [角色名|语音|时长|内容] 或 [角色名|转账|收款人|金额|备注]
3.  例如: <私聊>[三三|你刚才发的动态是什么意思？]</私聊>
---
`;

            const formatRules = `
---
朋友圈评论生成规则：
1.  你将扮演圈子里的好友，对玩家的动态进行评论和点赞。
2.  点赞格式：用中文括号包裹点赞列表，格式为（已点赞：张三,李四,王五）。点赞者可以是圈内任何AI角色或额外好友。
3.  严格按照以下格式，每条评论都是一个独立的单元: 〖评论者角色名：评论内容〗，禁止在〖〗内嵌套〖〗。
4.  评论内容要符合角色人设，不超过20个字。
5.  **严禁OOC，严禁生成格式之外的内容，严禁代替玩家进行评论或回复**。
6.  至少生成2条评论，最多生成5条评论。
7.  举例：
（已点赞：33,vv,入入）
〖33：这是什么，看起来很好吃的样子〗
〖入入：我也要吃www〗
---
`;
            const finalPrompt = [
                postContentText,
                `--- 参与评论的角色资料参考 ---\n${membersInfo}`,
                `--- 最近的聊天记录参考 ---\n${contextHistory}`, // 修改处：添加了聊天记录上下文
                privateChatRules,
                formatRules
            ].join('\n\n');

            console.log("--- MOMENTS COMMENT PROMPT --- \n", finalPrompt);
            return finalPrompt;
        },

        async buildMomentsPlayerCommentPrompt(momentId, playerComment) {
            const moment = await DBHelper.get('moments', momentId);
            const circle = await DBHelper.get('circles', moment.circleId);
            if (!circle || !circle.memberIds || circle.memberIds.length === 0) return null;

            const myProfile = await DBHelper.get('profile', 'myProfile');
            const allContacts = await DBHelper.getAll('contacts');

            // 准备角色资料
            let membersToProvideInfo = [];
            const circleMembers = allContacts.filter(c => circle.memberIds.includes(c.id));

            // 1. 添加被回复者的资料 (如果是AI角色)
            const repliedToContact = playerComment.replyTo ? circleMembers.find(c => c.name === playerComment.replyTo) : null;
            if (repliedToContact) {
                membersToProvideInfo.push(repliedToContact);
            }

            // 2. 随机抽取 1-3 位其他圈内好友
            const otherMembers = circleMembers.filter(c => c.name !== playerComment.replyTo);
            const shuffled = otherMembers.sort(() => 0.5 - Math.random());
            const numToSelect = Math.floor(Math.random() * 3) + 1;
            const selectedRandomMembers = shuffled.slice(0, Math.min(numToSelect, otherMembers.length));
            membersToProvideInfo.push(...selectedRandomMembers);

            membersToProvideInfo = [...new Set(membersToProvideInfo)]; // 去重

            const membersInfo = membersToProvideInfo.length > 0
                ? membersToProvideInfo.map(m => `角色名: ${m.name}\n性别: ${m.gender}\n喜好: ${m.likes || '无'}\n厌恶: ${m.dislikes || '无'}\n习惯: ${m.habits || '无'}\n背景: ${m.background || '无'}`).join('\n---\n')
                : '无';

            // 构建历史和当前动作
            let momentAuthor = moment.authorId === myProfile.id ? myProfile : allContacts.find(c => c.id === moment.authorId) || { name: moment.authorId };
            let postAndCommentsHistory = `这是“${momentAuthor.name}”发布的动态：“${moment.content}”\n目前的评论有：\n` +
                (moment.comments || []).map(c => {
                    const cAuthor = c.authorId === myProfile.id ? myProfile : allContacts.find(u => u.id === c.authorId) || { name: c.authorId };
                    return `“${cAuthor.name}${c.replyTo ? ` 回复 ${c.replyTo}` : ''}：${c.content}”`;
                }).join('\n');

            const playerActionText = playerComment.replyTo
                ? `玩家“${myProfile.name}”回复了“${playerComment.replyTo}”说：“${playerComment.content}”`
                : `玩家“${myProfile.name}”评论说：“${playerComment.content}”`;

            const privateChatRules = `
---
私聊规则(可选):
1.  如果你想让某个角色私聊玩家，请使用 <私聊></私聊> 标签包裹。
2.  私聊内容格式可以是: [角色名|消息内容] 或 {角色名|撤回内容} 或 [角色名|语音|时长|内容] 或 [角色名|转账|收款人|金额|备注]
3.  例如: <私聊>[33|你刚才发的动态是什么意思？]</私聊>
---
`;

            const formatRules = `
---
朋友圈评论生成规则：
1.  你将扮演圈内好友对玩家的评论做出回应。
2.  严格按照以下格式生成回复，可以只有点赞，或只有评论，或两者都有。
3.  点赞格式：用中文括号包裹点赞列表，格式为（已点赞：张三,李四）。
4.  评论格式: 〖评论者角色名：评论内容〗，禁止在〖〗内嵌套〖〗。
5.  评论内容要符合角色人设，可以是对玩家评论的直接回应，也可以是角色之间的互动。
6.  严禁OOC，严禁生成格式之外的内容。
---
`;

            const finalPrompt = [
                `--- 角色资料参考 ---\n${membersInfo}`,
                `--- 动态与历史评论 ---\n${postAndCommentsHistory}`,
                `--- 玩家最新动作 ---\n${playerActionText}`,
                privateChatRules,
                formatRules
            ].join('\n\n');

            console.log("--- MOMENTS PLAYER COMMENT PROMPT --- \n", finalPrompt);
            return finalPrompt;
        },

        async parseAndDisplayMomentsResponse(text) {
            const momentsListUl = $('#moments-list');
            const momentBlocks = text.match(/<朋友圈>[\s\S]*?<\/朋友圈>/g) || [];
            const allContacts = await DBHelper.getAll('contacts');
            const myProfile = await DBHelper.get('profile', 'myProfile');
            const circle = await DBHelper.get('circles', appState.currentCircleId);

            if (momentBlocks.length > 0 && momentsListUl.innerHTML.includes('还没有动态')) {
                momentsListUl.innerHTML = '';
            }

            for (const block of momentBlocks) {
                const postMatch = block.match(/【(.*?)】/);
                if (!postMatch) continue;

                const [authorPart, timePart] = postMatch[1].split('|');
                const [authorName, ...contentParts] = authorPart.split('：');
                const content = contentParts.join('：');

                const author = allContacts.find(c => c.name === authorName.trim());


                const likeMatch = block.match(/（已点赞：(.*?)）/);
                const likerNames = likeMatch ? likeMatch[1].split(/,|，/).map(n => n.trim()) : [];

                const newMoment = {
                    id: Utils.generateId('moment'),
                    circleId: appState.currentCircleId,
                    authorId: author ? author.id : authorName.trim(),
                    content: content.trim(),
                    images: [],
                    timestamp: Utils.parseMomentTimestamp(timePart ? timePart.trim() : null),
                    likes: likerNames,
                    comments: []
                };

                const commentMatches = block.match(/〖(.*?)〗/g) || [];
                for (const cMatch of commentMatches) {
                    const inner = cMatch.slice(1, -1);
                    const [cAuthorName, ...cContentParts] = inner.split('：');
                    const trimmedAuthorName = cAuthorName.trim();

                    let authorId;
                    if (trimmedAuthorName === myProfile.name) {
                        authorId = myProfile.id;
                    } else {
                        const cAuthor = allContacts.find(c => c.name === trimmedAuthorName);
                        authorId = cAuthor ? cAuthor.id : trimmedAuthorName;
                    }

                    newMoment.comments.push({
                        authorId: authorId,
                        content: cContentParts.join('：').trim(),
                        timestamp: Date.now()
                    });
                }

                await DBHelper.put('moments', newMoment);
                const momentElement = UIManager.createMomentElement(newMoment, myProfile, allContacts, circle.extraMembers);
                momentsListUl.prepend(momentElement);
            }
        },
        async parseAndDisplayMomentsCommentsResponse(momentId, text) {
            const moment = await DBHelper.get('moments', momentId);
            if (!moment) return; // 如果找不到动态，则提前退出

            // 1. 处理私聊消息
            const privateChatRegex = /<私聊>([\s\S]*?)<\/私聊>/g;
            let privateMessageMatch;
            while ((privateMessageMatch = privateChatRegex.exec(text)) !== null) {
                await this.handlePrivateMessageFromMoment(privateMessageMatch[1], moment);
            }
            const publicText = text.replace(privateChatRegex, '').trim();

            // 2. 处理公开的点赞和评论
            const allContacts = await DBHelper.getAll('contacts');
            const myProfile = await DBHelper.get('profile', 'myProfile');
            const postElement = $(`[data-moment-id="${momentId}"]`);

            if (!postElement) return;

            const interactionsContainer = postElement.querySelector('.post-interactions');
            if (!interactionsContainer) return;
            interactionsContainer.style.display = 'block';

            const likeMatch = publicText.match(/（已点赞：(.*?)）/);
            if (likeMatch && likeMatch[1]) {
                const likerNames = likeMatch[1].split(/,|，/).map(n => n.trim()).filter(Boolean);
                if (!moment.likes) moment.likes = [];
                likerNames.forEach(name => {
                    if (!moment.likes.includes(name)) moment.likes.push(name);
                });
                const likesContainer = interactionsContainer.querySelector('.post-likes');
                if (likesContainer && moment.likes.length > 0) {
                    likesContainer.innerHTML = `<i class="fas fa-heart"></i> ${moment.likes.join(', ')}`;
                }
                const likeBtn = postElement.querySelector('[data-action="like"]');
                if (likeBtn) {
                    likeBtn.classList.toggle('liked', moment.likes.includes(myProfile.name));
                }
            }

            const commentMatches = publicText.match(/〖(.*?)〗/g) || [];
            const commentsListContainer = interactionsContainer.querySelector('.post-comments-list');
            if (!commentsListContainer) return;

            if (commentMatches.length === 0 && !likeMatch) {
                if (likeMatch) await DBHelper.put('moments', moment);
                return;
            }

            for (const cMatch of commentMatches) {
                await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 400));
                const inner = cMatch.slice(1, -1);
                const [cAuthorName, ...cContentParts] = inner.split('：');
                const content = cContentParts.join('：').trim();
                if (!content) continue;

                const cAuthor = allContacts.find(c => c.name === cAuthorName.trim());
                const authorId = cAuthor ? cAuthor.id : cAuthorName.trim();

                const newComment = { authorId, content, timestamp: Date.now() };
                if (!moment.comments) moment.comments = [];
                moment.comments.push(newComment);

                let commentAuthorInfo;
                if (authorId === myProfile.id) {
                    commentAuthorInfo = myProfile;
                } else {
                    commentAuthorInfo = allContacts.find(c => c.id === authorId) || { name: authorId, id: authorId };
                }

                const commentDiv = document.createElement('div');
                commentDiv.className = 'post-comment-item';
                const authorStyle = commentAuthorInfo.id === myProfile.id ? 'style="color: #EDD4D8;"' : '';
                commentDiv.innerHTML = `<span class="comment-author" ${authorStyle}>${commentAuthorInfo.name}:</span> ${content}`;

                commentsListContainer.appendChild(commentDiv);
            }

            await DBHelper.put('moments', moment);
        },

        async handlePrivateMessageFromMoment(privateContent, moment) {
            if (!moment) return;

            const allContacts = await DBHelper.getAll('contacts');
            const myProfile = await DBHelper.get('profile', 'myProfile');

            const standardMatch = privateContent.match(/\[([^\[\]]+?)\]/);
            const retractedMatch = privateContent.match(/{([^{}]+?)}/);
            const emojiMatch = privateContent.match(/<([^>]+?)>/);

            let parts, senderName, sender;
            let match = standardMatch || retractedMatch || emojiMatch;
            if (!match) return;

            parts = match[1].split('|').map(p => p.trim());
            senderName = parts[0];
            sender = allContacts.find(c => c.name === senderName);
            if (!sender) return;

            // 1. 创建朋友圈上下文的系统消息
            const momentAuthor = (await EventManager.getMomentAuthor(moment.authorId))?.name || '未知作者';
            let commentsText = '无';
            if (moment.comments && moment.comments.length > 0) {
                commentsText = '\n' + moment.comments.map(c => {
                    const cAuthor = c.authorId === myProfile.id ? myProfile : allContacts.find(u => u.id === c.authorId) || { name: c.authorId };
                    return `${cAuthor.name}${c.replyTo ? ` 回复 ${c.replyTo}` : ''}: ${c.content}`;
                }).join('\n');
            }
            const contextContent = `<朋友圈动态>
动态发帖人：${momentAuthor}
动态内容：${moment.content}
动态时间：${Utils.formatTimestampSmartly(moment.timestamp)}
点赞情况：${(moment.likes && moment.likes.length > 0) ? moment.likes.join(', ') : '无'}
评论区：${commentsText}
</朋友圈动态>`;

            const contextMessage = {
                messageId: Utils.generateId('sys'),
                timestamp: Date.now() - 1, // 确保在真实消息之前
                type: 'system',
                segmentType: 'system',
                content: contextContent,
                isHidden: true, // 不在UI中显示
                forAi: true, // 让AI prompt构建器包含它
            };

            // 2. 创建实际的私聊消息
            const visibleMessage = {
                messageId: Utils.generateId('msg'),
                senderId: sender.id,
                timestamp: Date.now(),
                type: 'received',
                isUnread: appState.currentPage !== 'chat' || appState.currentChatId !== sender.id,
                senderInfo: sender,
            };

            if (retractedMatch) {
                visibleMessage.isRetracted = true;
                visibleMessage.segmentType = 'text';
                visibleMessage.content = parts[1];
            } else if (emojiMatch) {
                visibleMessage.segmentType = 'emoji-image';
                visibleMessage.content = parts[1];
            } else {
                if (parts.length === 2) {
                    visibleMessage.segmentType = 'text';
                    visibleMessage.content = parts[1];
                } else if (parts[1] === '语音') {
                    visibleMessage.segmentType = 'voice';
                    visibleMessage.content = `[语音] ${parts[3]}`;
                    visibleMessage.cardData = { duration: parts[2], content: parts[3] };
                } else if (parts[1] === '转账') {
                    visibleMessage.segmentType = 'transfer';
                    visibleMessage.content = `[转账] ${parts[3]}`;
                    visibleMessage.cardData = { recipientName: parts[2], amount: parts[3], note: parts[4], isClaimed: false };
                } else {
                    return;
                }
            }

            // 3. 将两条消息都存入数据库
            const privateChatData = await DBHelper.get('chats', sender.id) || { chatId: sender.id, history: [] };
            privateChatData.history.push(contextMessage, visibleMessage);
            await DBHelper.put('chats', privateChatData);

            // 4. 仅对可见消息触发通知
            if (visibleMessage.isUnread) {
                UIManager.showTopNotification(visibleMessage);
            }
        },

        async parseAndDisplayMomentsPlayerCommentResponse(momentId, text) {
            const moment = await DBHelper.get('moments', momentId);
            const allContacts = await DBHelper.getAll('contacts');
            const myProfile = await DBHelper.get('profile', 'myProfile');
            const postElement = $(`[data-moment-id="${momentId}"]`);

            if (!postElement) return;

            const interactionsContainer = postElement.querySelector('.post-interactions');
            interactionsContainer.style.display = 'block';


            const likeMatch = text.match(/（已点赞：(.*?)）/);
            if (likeMatch && likeMatch[1]) {
                const newLikerNames = likeMatch[1].split(/,|，/).map(n => n.trim()).filter(Boolean);

                if (!moment.likes) moment.likes = [];
                newLikerNames.forEach(name => {
                    if (!moment.likes.includes(name)) {
                        moment.likes.push(name);
                    }
                });

                const likesContainer = interactionsContainer.querySelector('.post-likes');
                if (likesContainer && moment.likes.length > 0) {
                    likesContainer.innerHTML = `<i class="fas fa-heart"></i> ${moment.likes.join(', ')}`;
                }
            }


            const commentMatches = text.match(/〖(.*?)〗/g) || [];
            const commentsListContainer = interactionsContainer.querySelector('.post-comments-list');

            if (commentMatches.length === 0 && !likeMatch) return;

            for (const cMatch of commentMatches) {
                await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 400));

                const inner = cMatch.slice(1, -1);
                const [cAuthorName, ...cContentParts] = inner.split('：');
                const content = cContentParts.join('：').trim();
                if (!content) continue;

                const cAuthor = allContacts.find(c => c.name === cAuthorName.trim());

                const newComment = {
                    authorId: cAuthor ? cAuthor.id : cAuthorName.trim(),
                    content: content,
                    timestamp: Date.now()
                };
                if (!moment.comments) moment.comments = [];
                moment.comments.push(newComment);

                const commentDiv = document.createElement('div');
                commentDiv.className = 'post-comment-item';
                commentDiv.dataset.authorName = cAuthor ? cAuthor.name : cAuthorName.trim();
                commentDiv.dataset.authorId = newComment.authorId;
                commentDiv.innerHTML = `<span class="comment-author">${cAuthor ? cAuthor.name : cAuthorName.trim()}:</span> ${content}`;
                commentsListContainer.appendChild(commentDiv);
            }

            await DBHelper.put('moments', moment);
        },
    };


    const EventManager = {
        init() {

            bottomNav.addEventListener('click', (e) => {
                const navItem = e.target.closest('.nav-item');
                if (navItem) UIManager.navigateTo(navItem.dataset.page);
            });


            $('#nav-to-moments').addEventListener('click', () => UIManager.navigateTo('moments', 'discover'));


            $('#moments-back-btn').addEventListener('click', () => UIManager.navigateTo('discover'));
            $('#moments-refresh-btn').addEventListener('click', () => AIHandler.handleMomentsRefreshRequest());
            $('#moments-new-post-btn').addEventListener('click', () => this.handleNewMoment());
            $('#moments-manage-btn').addEventListener('click', () => UIManager.showCircleManagementSidebar());
            $('#moments-list').addEventListener('click', (e) => {
                const postElement = e.target.closest('.moments-post');
                if (!postElement) return;

                const momentId = postElement.dataset.momentId;
                const actionBtn = e.target.closest('[data-action]');
                const commentItem = e.target.closest('.post-comment-item');


                if (actionBtn) {
                    const action = actionBtn.dataset.action;

                    if (action === 'toggle-comment') {
                        this.toggleCommentInput(postElement);
                    } else if (action === 'submit-comment') {
                        this.handlePlayerComment(momentId);
                    } else if (action === 'like') {
                        this.handlePlayerLike(momentId);
                    } else if (action === 'forward') {
                        this.handleForwardMoment(momentId);
                    }
                    return;
                }


                if (commentItem) {
                    const authorName = commentItem.dataset.authorName;
                    this.toggleCommentInput(postElement, authorName);
                }
            });

            $('#moments-list').addEventListener('mousedown', e => this.handleMomentCommentInteractionStart(e, 'mouse'));
            $('#moments-list').addEventListener('touchstart', e => this.handleMomentCommentInteractionStart(e, 'touch'));

            $('#my-avatar').addEventListener('click', () => this.handleEditProfile());
            $('#add-menu-btn').addEventListener('click', () => this.showAddMenu());
            $$('.tab-btn').forEach(btn => btn.addEventListener('click', () => UIManager.renderContactsPage(btn.dataset.tab)));
            $('#sort-friends-btn').addEventListener('click', () => this.handleSortContacts());
            $('#sort-groups-btn').addEventListener('click', () => this.handleSortGroups());
            $('#setting-chat').addEventListener('click', () => this.handleChatSettings());
            $('#setting-api').addEventListener('click', () => this.handleApiSettings());
            $('#setting-prompts').addEventListener('click', () => UIManager.navigateTo('prompts', 'settings'));
            $('#setting-theme').addEventListener('click', () => UIManager.navigateTo('theme-settings', 'settings'));
            $('#setting-reset').addEventListener('click', () => this.handleResetApp());


            $('#setting-tutorial').addEventListener('click', () => UIManager.navigateTo('tutorial', 'settings'));


            $('#tutorial-back-btn').addEventListener('click', () => UIManager.navigateTo('settings'));
            $('#page-tutorial .page-content').addEventListener('click', (e) => {
                const item = e.target.closest('.setting-item');
                if (!item) return;

                const showTutorialModal = (title, body) => {
                    UIManager.showModal({
                        title: title,
                        body: `<div style="line-height: 1.7; font-size: 0.95rem;">${body}</div>`,
                        actions: [{ text: '我明白了', class: 'btn-primary', handler: () => UIManager.hideModal() }]
                    });
                };

                switch (item.id) {
                    case 'tutorial-api':
                        showTutorialModal('如何配置API', `
                                <p>聊天室需要你提供一个AI服务商的API Key才能运行。</p>
                                <p>1. 进入 <strong>设置 > API配置</strong> 页面。</p>
                                <p>2. 从“API提供商”下拉框中选择你拥有的服务商（如Gemini, SiliconFlow等）。</p>
                                <p>3. 系统会自动填充大部分服务商的默认URL和模型，你只需在 <strong>API Key</strong> 输入框中填入你的密钥即可。</p>
                                <p>4. 如果你使用自定义或未列出的服务商，请选择“自定义”并手动填写所有字段。</p>
                                <p><strong>提示：</strong>API Key非常重要，请妥善保管，不要泄露。</p>
                            `);
                        break;
                    case 'tutorial-character':
                        showTutorialModal('如何创建新角色', `
                                <p>角色是与你聊天的好友。</p>
                                <p>1. 进入 <strong>通讯录</strong> 页面。</p>
                                <p>2. 点击右上角的 <strong>+</strong> 号按钮。</p>
                                <p>3. 在弹出的菜单中选择 <strong>添加新好友</strong>。</p>
                                <p>4. 填写角色的各项信息。<strong>姓名</strong>是角色的唯一ID，不可重复。其他信息如喜好、背景按需要填写。</p>
                                <p>5. 点击“添加”即可完成创建。</p>
                                <p>6. 点击<strong>通讯录</strong>页面的好友可进入聊天界面</p>
                            `);
                        break;
                    case 'tutorial-group':
                        showTutorialModal('如何创建群聊', `
                                <p>你可以创建包含多个好友角色的群聊。</p>
                                <p>1. 同样在 <strong>通讯录</strong> 页面，点击右上角 <strong>+</strong> 号并选择 <strong>新建群聊</strong>。</p>
                                <p>2. 为群聊起一个名字，并从好友列表中勾选要加入群聊的好友角色（至少一位）。</p>
                                <p>3. 你还可以指定一位群主，群主可以是你自己或任何一位好友角色。</p>
                                <p>4. 创建成功后，你就可以在群聊中与多个好友同时互动了。</p>
                            `);
                        break;
                    case 'tutorial-chatting':
                        showTutorialModal('如何进行聊天', `
                                <p><strong>1. 发送与回复：</strong></p>
                                <p>在聊天输入框（右下角）输入并发送你的所有消息后，点击左下角的 <strong>羽毛按钮 <i class="fas fa-feather-alt"></i></strong> 来让AI进行回复。</p>
                                <p><strong>2. 重新生成：</strong></p>
                                <p>如果你对AI的最新回复不满意，可以点击你自己的头像，AI会撤销刚才的回复并重新生成一次。</p>
                                <p><strong>3. 查看内心：</strong></p>
                                <p>想知道好友在想什么吗？点击好友的头像，可以看到TA最近的“心声”和“随笔”。</p>
                                <p><strong>4. 更多操作：</strong></p>
                                <p>长按任意一条消息气泡，可以进行“引用”、“删除”或“撤回”（仅自己发的消息）操作。</p>
                            `);
                        break;
                    case 'tutorial-opening-scene':
                        showTutorialModal('开场白是什么？', `
                                <p>开场白是一个<strong>预设的对话场景</strong>，用于快速开启一段特定情境的对话，而无需从零开始引导。</p>
                                <p><strong>如何添加与应用：</strong></p>
                                <p>1. 在好友或群聊的聊天界面，点击右上角的菜单按钮(<i class="fas fa-ellipsis-v"></i> 或 <i class="fas fa-ellipsis-h"></i>)进入管理界面。</p>
                                <p>2. 选择 <strong>开场白设定</strong>，你可以在这里新建、编辑或删除多个开场白方案。</p>
                                <p>3. 在开场白列表中点击 <strong>应用</strong> 按钮后，<strong>当前聊天记录会被清空</strong>，然后好友/群聊会根据你设定的开场白内容，自动开始一段新的对话。</p>
                                <p><strong>提示：</strong>这是一个非常适合快速测试角色设定或开启新剧情的功能。</p>
                            `);
                        break;
                    case 'tutorial-prompts':
                        showTutorialModal('提示词是什么？', `
                                <p>提示词（Prompt）是用来指导AI如何回应的特殊指令，能极大地影响角色的性格、说话风格和行为逻辑。</p>
                                <p><strong>功能与绑定：</strong></p>
                                <p>你可以在 <strong>设置 > 自定义提示词</strong> 页面创建和管理提示词。提示词可以绑定给单个好友、群聊、甚至朋友圈（影响动态生成），让好友在不同场景下遵循不同的规则。</p>
                                <p>点击<strong>聊天界面/朋友圈界面右上角</strong>的管理按钮，选择<strong>绑定提示词</strong></p>
                                <p><strong>提示词类型：</strong></p>
                                <p>  - <strong>显性(Explicit):</strong> 这种提示词<strong>总是</strong>会被激活，非常适合定义角色的核心性格、世界观或必须遵守的规则。</p>
                                <p>  - <strong>隐性(Implicit):</strong> 只有当你的发言中包含预设的<strong>关键词</strong>时，这种提示词才会被激活。适合设定一些特定情境下的反应，如“当玩家提到‘下雨’时，角色会表现出悲伤”。</p>
                                <p><strong>导入与导出：</strong></p>
                                <p>在提示词管理页面，你可以将写好的提示词文件夹导出为<code>.json</code>文件，用于备份或分享给他人。同样，也可以导入他人分享的提示词文件。</p>
                                <p><strong>注意（Token消耗）：</strong></p>
                                <p>提示词内容越长、绑定的提示词越多，每次与好友交互时消耗的Token就越多，并降低响应速度。请根据需要自行取舍。</p>
                            `);
                        break;
                    case 'tutorial-import-export':
                        showTutorialModal('如何导入导出', `
                                <p>你可以方便地分享或备份你的角色与群聊数据。</p>
                                <p><strong>导出：</strong></p>
                                <p>1. 在通讯录点击好友或群聊的详情按钮，或在聊天页面点击右上角菜单进入管理页面。</p>
                                <p>2. 点击“导出角色/群聊”按钮，会生成一个 <code>.json</code> 格式的配置文件，保存到本地即可。</p>
                                <p><strong>导入：</strong></p>
                                <p>1. 在通讯录页面，点击右上角 <strong>+</strong> 号，选择 <strong>导入角色/群聊</strong>。</p>
                                <p>2. 选择你之前导出的 <code>.json</code> 文件，系统会自动识别并导入。</p>
                                <p>导入前确保导入的文件是支持这个聊天室使用的。</p>
                                <p><strong>提示：</strong>如果导入的角色名与现有角色冲突，系统会提示你选择“更新”或“覆盖”。</p>
                            `);
                        break;
                    case 'tutorial-moments':
                        showTutorialModal('朋友圈如何使用', `
                                <p>朋友圈是一个模拟社交动态的趣味功能。</p>
                                <p>1. 进入 <strong>发现 > 朋友圈</strong>。首次进入需要点击右上角菜单按钮，先创建一个“圈子”。</p>
                                <p>2. 点击右上角菜单按钮可以 <strong>管理圈子</strong>（增删改查、切换）。</p>
                                <p>3. 点击相机图标可以 <strong>发布你自己的动态</strong>。</p>
                                <p>4. 点击刷新按钮，好友会根据已有设定，<strong>自动生成新的朋友圈动态</strong>。</p>
                                <p>5. 你可以像真实社交软件一样，对动态进行点赞、评论和转发。</p>
                            `);
                        break;
                    case 'tutorial-theme':
                        showTutorialModal('如何设置主题', `
                                <p>你可以高度自定义应用的外观。</p>
                                <p>1. 进入 <strong>设置 > 主题设置</strong>。</p>
                                <p>2. 在这里，你可以更改<strong>弹窗风格</strong>、<strong>聊天气泡样式</strong>、<strong>字体大小</strong>和<strong>颜色</strong>。</p>
                                <p>3. 点击 <strong>通用设置 > 背景与封面</strong>，可以上传你喜欢的图片作为全局页面背景、全局聊天背景，好友/群聊聊天界面右上角可设置专属聊天背景。支持自定义红包和转账的封面图。</p>
                                <p>4. <strong>字体设置</strong>你可以加载可免费使用的或已购买的本地字体文件/网络字体资源</p>
                            `);
                        break;
                }
            });


            chatBackBtn.addEventListener('click', async () => {
                const chatId = appState.currentChatId;
                if (chatId) {
                    const chatData = await DBHelper.get('chats', chatId);
                    if (chatData && chatData.history) {
                        let madeChanges = false;
                        chatData.history.forEach(msg => {
                            if (msg.isUnread) {
                                msg.isUnread = false;
                                madeChanges = true;
                            }
                        });
                        if (madeChanges) {
                            await DBHelper.put('chats', chatData);
                        }
                    }
                }
                this.resetQuoteState();
                UIManager.navigateTo('messages');
            });
            $('#chat-manage-btn').addEventListener('click', () => {
                const chatId = appState.currentChatId;
                if (!chatId) return;
                if (chatId.startsWith('group-')) this.handleOpenGroupManagementSidebar(chatId);
                else this.handleOpenFriendManagementSidebar(chatId);
            });
            sendBtn.addEventListener('click', () => this.handlePlayerSendMessage());
            messageInput.addEventListener('keypress', async (e) => {
                const chatSettings = await DBHelper.get('apiConfig', 'chatSettings') || {};
                if (chatSettings.enterToSend && e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handlePlayerSendMessage();
                }
            });
            aiRequestBtn.addEventListener('click', () => {
                if (AIHandler.isAwaitingResponse) AIHandler.cancelAiRequest();
                else AIHandler.handleAiReplyRequest();
            });
            messageInput.addEventListener('input', () => {
                messageInput.style.height = 'auto';
                messageInput.style.height = (messageInput.scrollHeight) + 'px';
            });


            appContainer.addEventListener('click', (e) => this.handleClickEffect(e));
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay && !modalOverlay.classList.contains('no-overlay-close')) UIManager.hideModal();
            });
            $('#sidebar-overlay').addEventListener('click', (e) => {
                if (e.target === $('#sidebar-overlay')) UIManager.hideSidebar();
            });

            $('#bottom-sheet-overlay').addEventListener('click', (e) => {
                if (e.target === $('#bottom-sheet-overlay')) UIManager.hideBottomSheet();
            });


            emojiBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                favoriteEmojiCard.classList.remove('active'); // 关闭另一个
                emojiCard.classList.toggle('active');
            });

            favoriteEmojiBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                emojiCard.classList.remove('active'); // 关闭另一个
                favoriteEmojiCard.classList.toggle('active');
                if (favoriteEmojiCard.classList.contains('active')) {
                    this.renderFavoriteEmojiPage();
                }
            });

            $('#simulated-image-btn').addEventListener('click', () => this.handleSimulatedImageSend());
            voiceBtn.addEventListener('click', () => this.handleVoiceInput());
            $('#transfer-btn').addEventListener('click', () => this.handlePlayerTransfer());
            $('#red-packet-btn').addEventListener('click', () => this.handlePlayerRedPacket());
            document.addEventListener('click', (e) => {
                if (!chatInputArea.contains(e.target)) {
                    emojiCard.classList.remove('active');
                    favoriteEmojiCard.classList.remove('active');
                }
            });
            $('#emoji-prev-btn').addEventListener('click', () => { appState.emojiCurrentPage--; this.renderEmojiPage(); });
            $('#emoji-next-btn').addEventListener('click', () => { appState.emojiCurrentPage++; this.renderEmojiPage(); });
            $('#favorite-emoji-prev-btn').addEventListener('click', () => { appState.favoriteEmojiCurrentPage--; this.renderFavoriteEmojiPage(); });
            $('#favorite-emoji-next-btn').addEventListener('click', () => { appState.favoriteEmojiCurrentPage++; this.renderFavoriteEmojiPage(); });

            chatArea.addEventListener('mousedown', (e) => this.handleInteractionStart(e, 'mouse'));
            chatArea.addEventListener('touchstart', (e) => this.handleInteractionStart(e, 'touch'));
            cancelQuoteBtn.addEventListener('click', () => this.resetQuoteState());

            chatArea.addEventListener('click', async (e) => {
                const messageRow = e.target.closest('.message-row');
                if (!messageRow) return;
                const messageId = messageRow.dataset.messageId;
                const voiceBubble = e.target.closest('.voice-message-bubble');
                if (voiceBubble) {
                    const wrapper = voiceBubble.closest('.bubble-and-tag-wrapper');
                    const transcript = wrapper.querySelector('.voice-transcript');
                    if (transcript) transcript.classList.toggle('show');
                    return;
                }
                const cardWrapper = e.target.closest('.card-message-wrapper');
                if (cardWrapper) {
                    const cardId = cardWrapper.dataset.cardId;
                    if (!cardId) return;
                    const detailElement = document.getElementById(cardId);
                    if (detailElement) detailElement.classList.toggle('visible');
                    return;
                }
                const specialBubble = e.target.closest('.transfer-or-red-packet-bubble');
                if (specialBubble) {
                    const chatData = await DBHelper.get('chats', appState.currentChatId);
                    const msg = chatData.history.find(m => m.messageId === messageId);
                    if (!msg) return;
                    if (msg.segmentType === 'transfer' && !msg.cardData.isClaimed) {
                        this.handleTransferClick(msg);
                    } else if (msg.segmentType === 'red-packet' && !msg.cardData.isClaimedByPlayer) {
                        this.handleRedPacketClick(msg);
                    }
                    return;
                }


                const forwardedMomentCard = e.target.closest('.forwarded-moment-card-content');
                if (forwardedMomentCard) {
                    const momentId = forwardedMomentCard.dataset.momentId;
                    if (momentId) {
                        this.showForwardedMomentDetail(momentId);
                    }
                    return;
                }
            });
            chatArea.addEventListener('scroll', () => {
                if (chatArea.scrollTop < 50 && !appState.isHistoryLoading) {
                    UIManager.loadMoreMessages();
                }
            });

            const momentsBg = $('#moments-bg');
            const momentsBgInput = $('#moments-bg-input');

            momentsBg.addEventListener('click', () => {
                momentsBgInput.click();
            });

            momentsBgInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file || !appState.currentCircleId) return;

                try {
                    const compressedImage = await Utils.compressImage(file, 1000, 1000, 0.8);
                    const circle = await DBHelper.get('circles', appState.currentCircleId);
                    if (circle) {
                        circle.backgroundImage = compressedImage;
                        await DBHelper.put('circles', circle);
                        momentsBg.src = compressedImage;
                        UIManager.showToast('背景已更换！');
                    }
                } catch (error) {
                    console.error("更换背景失败：", error);
                    UIManager.showToast('图片处理失败，请重试');
                }
            });
        },

        async handlePlayerSendMessage(prebuiltMessage = null) {
            const content = messageInput.value.trim();
            if (!prebuiltMessage && (!content || !appState.currentChatId)) return;

            let message;
            const profile = await DBHelper.get('profile', 'myProfile');
            const chatData = await DBHelper.get('chats', appState.currentChatId) || { chatId: appState.currentChatId, history: [] };
            const lastMessage = chatData.history.length > 0 ? chatData.history[chatData.history.length - 1] : null;

            const now = Date.now();


            if (lastMessage && (now - lastMessage.timestamp > 5 * 60 * 1000)) {

                const timeDivider = UIManager.createTimeDividerElement(now);
                chatArea.appendChild(timeDivider);
            }

            if (prebuiltMessage) {
                message = prebuiltMessage;
                message.timestamp = now;
            } else if (appState.quotingMessage) {

                const quotedMsg = appState.quotingMessage;
                const contact = await DBHelper.get('contacts', quotedMsg.senderId);
                const senderName = contact ? (contact.remark || contact.name) : '对方';

                let quotedContentText;
                if (quotedMsg.segmentType === 'text') quotedContentText = quotedMsg.content;
                else if (quotedMsg.segmentType === 'voice') quotedContentText = '[语音]';
                else if (quotedMsg.segmentType === 'emoji-image') quotedContentText = '[表情包]';
                else quotedContentText = '[消息]';

                message = {
                    messageId: Utils.generateId('msg'),
                    content: `[引用] ${content}`,
                    timestamp: now,
                    type: 'sent',
                    segmentType: 'quote',
                    cardData: {
                        quotedName: senderName,
                        quotedContent: quotedContentText,
                        newContent: content
                    }
                };
                this.resetQuoteState();
            } else {

                message = {
                    messageId: Utils.generateId('msg'),
                    content,
                    timestamp: now,
                    type: 'sent',
                    isRetracted: false,
                    isUnread: false,
                    segmentType: 'text',
                };
            }

            chatData.history.push(message);
            await DBHelper.put('chats', chatData);


            chatData.turnCountSinceLastPrompt = (chatData.turnCountSinceLastPrompt || 0) + 1;
            await DBHelper.put('chats', chatData);

            UIManager.addMessageToDOM(message, profile, false, true);


            if (!prebuiltMessage) {
                messageInput.value = '';
                messageInput.style.height = 'auto';
                messageInput.focus();
            }
        },



        renderEmojiPage() {
            const emojiEntries = Object.entries(appState.playerEmojiMap);
            const pageCount = Math.ceil(emojiEntries.length / appState.emojisPerPage);

            if (appState.emojiCurrentPage < 0) appState.emojiCurrentPage = pageCount - 1;
            if (appState.emojiCurrentPage >= pageCount) appState.emojiCurrentPage = 0;

            const pageIndex = appState.emojiCurrentPage;
            const start = pageIndex * appState.emojisPerPage;
            const end = start + appState.emojisPerPage;
            const pageEmojis = emojiEntries.slice(start, end);

            emojiGrid.innerHTML = '';
            pageEmojis.forEach(([id, desc]) => {
                const item = document.createElement('div');
                item.className = 'emoji-item';
                item.dataset.emojiId = id;
                item.title = desc;

                const isFavorite = appState.favoriteEmojis.includes(id);

                item.innerHTML = `
                        <img src="https://z.wiki/u/${id}" alt="${desc}">
                        <div class="favorite-emoji-toggle ${isFavorite ? 'is-favorite' : ''}" title="收藏">
                            <i class="fas fa-star"></i>
                        </div>
                    `;

                const imgEl = item.querySelector('img');
                imgEl.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const profile = await DBHelper.get('profile', 'myProfile');
                    const message = {
                        messageId: Utils.generateId('msg'),
                        content: id,
                        timestamp: Date.now(),
                        type: 'sent',
                        segmentType: 'emoji-image',
                    };
                    const chatData = await DBHelper.get('chats', appState.currentChatId) || { chatId: appState.currentChatId, history: [] };
                    chatData.history.push(message);
                    await DBHelper.put('chats', chatData);
                    UIManager.addMessageToDOM(message, profile, false, true);
                    emojiCard.classList.remove('active');
                });

                const favToggle = item.querySelector('.favorite-emoji-toggle');
                favToggle.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const emojiId = item.dataset.emojiId;
                    const index = appState.favoriteEmojis.indexOf(emojiId);

                    if (index > -1) {
                        appState.favoriteEmojis.splice(index, 1);
                        favToggle.classList.remove('is-favorite');
                    } else {
                        appState.favoriteEmojis.push(emojiId);
                        favToggle.classList.add('is-favorite');
                    }

                    const profile = await DBHelper.get('profile', 'myProfile');
                    profile.favoriteEmojis = appState.favoriteEmojis;
                    await DBHelper.put('profile', profile);
                });

                emojiGrid.appendChild(item);
            });

            $('#emoji-page-indicator').textContent = `${pageIndex + 1} / ${pageCount}`;
        },

        renderFavoriteEmojiPage() {
            favoriteEmojiGrid.innerHTML = '';
            const favNav = $('#favorite-emoji-card .emoji-nav');

            if (appState.favoriteEmojis.length === 0) {
                favoriteEmojiGrid.innerHTML = `<p style="text-align:center; color: #aaa; padding: 20px 0; grid-column: 1 / -1;">还没有收藏的表情哦</p>`;
                if (favNav) favNav.style.display = 'none';
                return;
            }

            if (favNav) favNav.style.display = 'flex';

            const pageCount = Math.ceil(appState.favoriteEmojis.length / appState.emojisPerPage);

            if (appState.favoriteEmojiCurrentPage < 0) appState.favoriteEmojiCurrentPage = pageCount - 1;
            if (appState.favoriteEmojiCurrentPage >= pageCount) appState.favoriteEmojiCurrentPage = 0;

            const pageIndex = appState.favoriteEmojiCurrentPage;
            const start = pageIndex * appState.emojisPerPage;
            const end = start + appState.emojisPerPage;
            const pageEmojis = appState.favoriteEmojis.slice(start, end);

            pageEmojis.forEach(id => {
                const desc = appState.playerEmojiMap[id] || '已收藏表情';
                const item = document.createElement('div');
                item.className = 'emoji-item';
                item.dataset.emojiId = id;
                item.title = desc;

                item.innerHTML = `<img src="https://z.wiki/u/${id}" alt="${desc}" style="width: 60px; height: 60px;">`;

                let longPressTimer;
                let isLongPress = false;

                const handleUnfavorite = async () => {
                    const index = appState.favoriteEmojis.indexOf(id);
                    if (index > -1) {
                        appState.favoriteEmojis.splice(index, 1);
                        const profile = await DBHelper.get('profile', 'myProfile');
                        profile.favoriteEmojis = appState.favoriteEmojis;
                        await DBHelper.put('profile', profile);

                        const newPageCount = Math.ceil(appState.favoriteEmojis.length / appState.emojisPerPage);
                        if (appState.favoriteEmojiCurrentPage >= newPageCount && newPageCount > 0) {
                            appState.favoriteEmojiCurrentPage = newPageCount - 1;
                        }

                        this.renderFavoriteEmojiPage();
                        UIManager.showToast("已取消收藏");
                    }
                    UIManager.hideModal();
                };

                const startLongPress = (e) => {
                    isLongPress = false;
                    longPressTimer = setTimeout(() => {
                        isLongPress = true;
                        UIManager.showModal({
                            title: "取消收藏",
                            body: `<p>要将这个表情移出收藏吗？</p>`,
                            actions: [
                                { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                                { text: '确定', class: 'btn-danger', handler: handleUnfavorite }
                            ]
                        });
                    }, 500);
                };

                const cancelLongPress = () => {
                    clearTimeout(longPressTimer);
                };

                const handleClick = async (e) => {
                    if (isLongPress) {
                        return;
                    }
                    const profile = await DBHelper.get('profile', 'myProfile');
                    const message = {
                        messageId: Utils.generateId('msg'),
                        content: id,
                        timestamp: Date.now(),
                        type: 'sent',
                        segmentType: 'emoji-image',
                    };
                    const chatData = await DBHelper.get('chats', appState.currentChatId) || { chatId: appState.currentChatId, history: [] };
                    chatData.history.push(message);
                    await DBHelper.put('chats', chatData);
                    UIManager.addMessageToDOM(message, profile, false, true);
                    favoriteEmojiCard.classList.remove('active');
                };

                item.addEventListener('mousedown', startLongPress);
                item.addEventListener('touchstart', startLongPress, { passive: true });
                item.addEventListener('mouseup', cancelLongPress);
                item.addEventListener('mouseleave', cancelLongPress);
                item.addEventListener('touchend', cancelLongPress);
                item.addEventListener('touchcancel', cancelLongPress);
                item.addEventListener('click', handleClick);

                favoriteEmojiGrid.appendChild(item);
            });

            if (pageCount > 0) {
                $('#favorite-emoji-page-indicator').textContent = `${pageIndex + 1} / ${pageCount}`;
            } else {
                $('#favorite-emoji-page-indicator').textContent = `1 / 1`;
            }
        },

        async initEmojiPanel() {
            this.renderEmojiPage();
        },

        handleVoiceInput() {
            UIManager.showModal({
                isPersistent: true,
                customClass: 'modal-neumorphic',
                title: "发送语音",
                body: `
                    <div class="form-group">
                        <label for="modal-voice-text-input">语音内容 (文本)</label>
                        <textarea id="modal-voice-text-input" rows="4" placeholder="输入语音消息内容..."></textarea>
                    </div>
                `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '发送', class: 'btn-primary', handler: async () => {
                            const text = $('#modal-voice-text-input').value.trim();
                            if (!text) return;

                            let duration = Math.max(1, Math.ceil(text.length / 4));
                            duration = Math.min(duration, 60);

                            const profile = await DBHelper.get('profile', 'myProfile');
                            const message = {
                                messageId: Utils.generateId('msg'),
                                content: `[语音] ${text}`,
                                timestamp: Date.now(),
                                type: 'sent',
                                segmentType: 'voice',
                                cardData: {
                                    duration: `${duration}s`,
                                    content: text
                                }
                            };

                            await this.handlePlayerSendMessage(message);
                            UIManager.hideModal();
                        }
                    }
                ]
            });
            setTimeout(() => $('#modal-voice-text-input').focus(), 100);
        },

        async handlePlayerTransfer() {
            const isGroup = appState.currentChatId.startsWith('group-');
            let recipientHtml;
            let recipientName;

            if (isGroup) {

                recipientHtml = `
                        <div class="form-group">
                            <label>转账给</label>
                            <div id="transfer-recipient-display" class="form-group" style="padding: 12px 15px; cursor: pointer; background: #F0F0F3; border-radius: 12px; box-shadow: inset -5px -5px 9px rgba(255,255,255,0.7), inset 5px 5px 9px rgba(174,174,192,0.2);">
                                <span style="color: #888;">请选择收款人</span>
                            </div>
                        </div>
                    `;
            } else {

                const contact = await DBHelper.get('contacts', appState.currentChatId);
                recipientName = contact.name;
            }

            UIManager.showModal({
                isPersistent: true,
                customClass: 'modal-neumorphic',
                title: "转账",
                body: `
                        ${isGroup ? recipientHtml : ''}
                        <div class="form-group">
                            <label for="modal-transfer-amount">转账金额</label>
                            <input type="number" id="modal-transfer-amount" placeholder="0.00" min="0.01" step="0.01">
                        </div>
                        <div class="form-group">
                            <label for="modal-transfer-note">备注 (选填)</label>
                            <input type="text" id="modal-transfer-note" placeholder="转账说明">
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '转账', class: 'btn-primary', handler: async () => {
                            const amount = parseFloat($('#modal-transfer-amount').value);
                            const note = $('#modal-transfer-note').value.trim();

                            if (isNaN(amount) || amount <= 0) {
                                return UIManager.showToast('请输入有效的金额');
                            }
                            if (isGroup && !recipientName) {
                                return UIManager.showToast('请选择收款人');
                            }

                            const formattedAmount = `￥${amount.toFixed(2)}`;
                            const message = {
                                messageId: Utils.generateId('msg'),
                                content: `[转账] ${formattedAmount}`,
                                type: 'sent',
                                segmentType: 'transfer',
                                cardData: {
                                    recipientName: recipientName,
                                    amount: formattedAmount,
                                    note: note,
                                    isClaimed: false
                                }
                            };

                            await this.handlePlayerSendMessage(message);
                            UIManager.hideModal();
                        }
                    }
                ]
            });


            if (isGroup) {
                const displayDiv = $('#transfer-recipient-display');
                displayDiv.addEventListener('click', async () => {
                    const group = await DBHelper.get('groups', appState.currentChatId);
                    const contacts = await DBHelper.getAll('contacts');
                    const members = group.members
                        .map(id => contacts.find(c => c.id === id))
                        .filter(Boolean);

                    if (members.length === 0) return;

                    UIManager.showBottomSheet({
                        title: '选择收款人',
                        customClass: 'compact-list',
                        items: members.map(m => ({ value: m.name, text: m.remark || m.name })),
                        onSelect: (value, text) => {
                            recipientName = value;
                            displayDiv.querySelector('span').textContent = text;
                            displayDiv.querySelector('span').style.color = 'var(--text-color-dark)';
                        }
                    });
                });
            }
        },

        async handlePlayerRedPacket() {
            const isGroup = appState.currentChatId.startsWith('group-');
            const groupOnlyHtml = isGroup ? `
                    <div class="form-group">
                        <label for="modal-rp-count">红包个数</label>
                        <input type="number" id="modal-rp-count" value="1" min="1" step="1">
                    </div>
                ` : '';

            UIManager.showModal({
                isPersistent: true,
                customClass: 'modal-neumorphic',
                title: "发红包",
                body: `
                        <div class="form-group">
                            <label for="modal-rp-amount">总金额</label>
                            <input type="number" id="modal-rp-amount" placeholder="0.00" min="0.01" step="0.01">
                        </div>
                        <div class="form-group">
                            <label for="modal-rp-title">红包祝福语 (选填)</label>
                            <input type="text" id="modal-rp-title" placeholder="恭喜发财，大吉大利">
                        </div>
                        ${groupOnlyHtml}
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '塞钱进红包', class: 'btn-primary', handler: async () => {
                            const amount = parseFloat($('#modal-rp-amount').value);
                            const title = $('#modal-rp-title').value.trim() || '恭喜发财，大吉大利';
                            const count = isGroup ? parseInt($('#modal-rp-count').value, 10) : 1;

                            if (isNaN(amount) || amount <= 0) {
                                return UIManager.showToast('请输入有效的金额');
                            }
                            if (isGroup && (isNaN(count) || count <= 0)) {
                                return UIManager.showToast('请输入有效的红包个数');
                            }
                            if (isGroup && amount < count * 0.01) {
                                return UIManager.showToast('单个红包金额不能少于0.01元');
                            }

                            const message = {
                                messageId: Utils.generateId('msg'),
                                content: `[红包] ${title}`,
                                type: 'sent',
                                segmentType: 'red-packet',
                                cardData: {
                                    title: title,
                                    amount: amount,
                                    count: count,
                                    isClaimedByPlayer: false,
                                    claimedBy: []
                                }
                            };

                            await this.handlePlayerSendMessage(message);
                            UIManager.hideModal();
                        }
                    }
                ]
            });
        },



        handleInteractionStart(e, type) {
            const bubble = e.target.closest('.bubble');
            if (!bubble) return;

            const messageRow = bubble.closest('.message-row');
            if (!messageRow || !messageRow.dataset.messageId) return;

            clearTimeout(appState.longPressTimer);

            const startAction = () => {

                const existingButton = $('.retract-button-wrapper.show');
                if (existingButton) {
                    existingButton.remove();
                }

                if (messageRow.classList.contains('received')) {
                    this.showMessageOptions(messageRow, 'received');
                } else if (messageRow.classList.contains('sent')) {
                    this.showMessageOptions(messageRow, 'sent');
                }
            };

            appState.longPressTimer = setTimeout(startAction, 500);

            const clearLongPress = () => {
                clearTimeout(appState.longPressTimer);
                document.removeEventListener(type === 'mouse' ? 'mouseup' : 'touchend', clearLongPress);
                document.removeEventListener(type === 'mouse' ? 'mouseleave' : 'touchcancel', clearLongPress);
            };
            document.addEventListener(type === 'mouse' ? 'mouseup' : 'touchend', clearLongPress);
            document.addEventListener(type === 'mouse' ? 'mouseleave' : 'touchcancel', clearLongPress);
        },

        async startQuote(messageRowElement) {
            const messageId = messageRowElement.dataset.messageId;
            const chatData = await DBHelper.get('chats', appState.currentChatId);
            const messageData = chatData.history.find(m => m.messageId === messageId);
            if (!messageData || messageData.isRetracted) return;

            appState.quotingMessage = messageData;
            const contact = await DBHelper.get('contacts', messageData.senderId);
            const senderName = contact ? (contact.remark || contact.name) : '对方';

            let quotedContentText;
            if (messageData.segmentType === 'text') {
                quotedContentText = messageData.content;
            } else if (messageData.segmentType === 'voice') {
                quotedContentText = '[语音]';
            } else if (messageData.segmentType === 'emoji-image') {
                quotedContentText = '[表情包]';
            } else {
                return;
            }

            quotePreviewContent.textContent = `${senderName}: ${quotedContentText}`;
            quotePreviewArea.style.display = 'flex';
            messageInput.focus();
        },

        resetQuoteState() {
            appState.quotingMessage = null;
            quotePreviewArea.style.display = 'none';
        },

        async showMessageOptions(messageRowElement, messageType) {
            const messageId = messageRowElement.dataset.messageId;
            if (!messageId) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'retract-button-wrapper';

            let buttonsHtml = '';
            if (messageType === 'sent') {
                buttonsHtml = `
                        <button class="retract-btn" data-action="delete"><i class="fas fa-trash"></i> 删除</button>
                        <button class="retract-btn" data-action="retract"><i class="fas fa-undo"></i> 撤回</button>
                    `;
            } else {
                buttonsHtml = `
                        <button class="retract-btn" data-action="delete"><i class="fas fa-trash"></i> 删除</button>
                        <button class="retract-btn" data-action="quote"><i class="fas fa-quote-left"></i> 引用</button>
                    `;
            }
            wrapper.innerHTML = buttonsHtml;


            wrapper.addEventListener('click', async (e) => {
                e.stopPropagation();
                const button = e.target.closest('.retract-btn');
                if (!button) return;

                const action = button.dataset.action;

                if (action === 'delete') {
                    const chatData = await DBHelper.get('chats', appState.currentChatId);
                    chatData.history = chatData.history.filter(m => m.messageId !== messageId);
                    await DBHelper.put('chats', chatData);

                    const originalRow = $(`#${messageId}`);
                    if (originalRow) {
                        originalRow.remove();
                    }
                    wrapper.remove();
                } else if (action === 'retract') {
                    const chatData = await DBHelper.get('chats', appState.currentChatId);
                    const msgIndex = chatData.history.findIndex(m => m.messageId === messageId);
                    if (msgIndex === -1) return;

                    const msgToRetract = chatData.history[msgIndex];
                    msgToRetract.isRetracted = true;
                    await DBHelper.put('chats', chatData);

                    const myProfile = await DBHelper.get('profile', 'myProfile');
                    const retractionNotice = UIManager.createRetractionNotice(msgToRetract, myProfile);

                    const originalRow = $(`#${messageId}`);
                    if (originalRow) {
                        originalRow.replaceWith(retractionNotice);
                    }
                    wrapper.remove();
                } else if (action === 'quote') {
                    this.startQuote(messageRowElement);
                    wrapper.remove();
                }
            });

            const bubbleWrapper = messageRowElement.querySelector('.bubble-and-tag-wrapper');
            if (bubbleWrapper) {
                bubbleWrapper.appendChild(wrapper);
                setTimeout(() => wrapper.classList.add('show'), 10);
            }

            const hideOnClickOutside = (event) => {
                if (!wrapper.contains(event.target)) {
                    wrapper.remove();
                    document.removeEventListener('click', hideOnClickOutside, true);
                }
            };
            document.addEventListener('click', hideOnClickOutside, true);
        },

        async handleEditProfile() {
            const profile = await DBHelper.get('profile', 'myProfile');
            UIManager.showSidebar({
                position: 'left',
                title: "我的信息",
                body: `
                        <div class="form-group">
                            <label>头像</label>
                            <div class="avatar-uploader">
                                <img src="${profile.avatar}" id="profile-avatar-preview" class="avatar-preview">
                                <input type="file" id="profile-avatar-input" accept="image/*" style="display:none;">
                                <button class="upload-btn" onclick="document.getElementById('profile-avatar-input').click()">上传新头像</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="profile-name-input">姓名</label>
                            <input type="text" id="profile-name-input" value="${profile.name}">
                        </div>
                        <div class="form-group">
                            <label for="profile-gender-select">性别</label>
                            <select id="profile-gender-select">
                                <option value="男" ${profile.gender === '男' ? 'selected' : ''}>男</option>
                                <option value="女" ${profile.gender === '女' ? 'selected' : ''}>女</option>
                                <option value="其他" ${profile.gender === '其他' ? 'selected' : ''}>其他</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="profile-background-input">背景资料 (选填)</label>
                            <textarea id="profile-background-input">${profile.background || ''}</textarea>
                        </div>
                        <p style="text-align: center; font-size: 12px; color: #aaa; user-select: none; margin-top: 30px;">此聊天室由33制作，xhs:@回风</p>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideSidebar() },
                    {
                        text: '保存', class: 'btn-primary', handler: async () => {
                            const newAvatar = $('#profile-avatar-preview').src;
                            const newName = $('#profile-name-input').value.trim();
                            if (!newName) {
                                UIManager.showModal({ title: "提示", body: "<p>姓名不能为空！</p>", actions: [{ text: "好的", class: "btn-primary", handler: () => UIManager.hideModal() }] });
                                return;
                            }

                            const updatedProfile = {
                                ...profile,
                                avatar: newAvatar,
                                name: newName,
                                gender: $('#profile-gender-select').value,
                                background: $('#profile-background-input').value.trim()
                            };

                            await DBHelper.put('profile', updatedProfile);
                            $('#my-avatar').src = newAvatar;
                            UIManager.hideSidebar();
                        }
                    }
                ]
            });


            $('#profile-avatar-input').addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    const base64 = await Utils.fileToBase64(file);
                    $('#profile-avatar-preview').src = base64;
                }
            });
        },

        showAddMenu() {
            UIManager.showModal({
                title: "新建/导入",
                body: `
                        <div class="settings-list" style="padding:0; margin:0;">
                            <div class="setting-item" id="add-friend-menu">
                                <i class="fas fa-user-plus"></i>
                                <span>添加新好友</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                             <div class="setting-item" id="create-group-menu">
                                <i class="fas fa-users"></i>
                                <span>新建群聊</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                             <div class="setting-item" id="import-data-menu">
                                <i class="fas fa-file-import"></i>
                                <span>导入角色/群聊</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>`,
                actions: []
            });

            $('#add-friend-menu').addEventListener('click', () => this.handleAddFriend());
            $('#create-group-menu').addEventListener('click', () => this.handleCreateGroup());
            $('#import-data-menu').addEventListener('click', () => this.handleImportData());
        },

        handleAddFriend() {
            const defaultAvatar = Utils.createAvatarDataUrl(Utils.getRandomColor());
            UIManager.showModal({
                isPersistent: true,
                title: "添加新好友",
                body: `
                        <div class="form-group">
                            <label>头像</label>
                            <div class="avatar-uploader">
                                <img src="${defaultAvatar}" id="add-friend-avatar-preview" class="avatar-preview">
                                <input type="file" id="add-friend-avatar-input" accept="image/*" style="display:none;">
                                <button class="upload-btn" onclick="document.getElementById('add-friend-avatar-input').click()">上传头像</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="add-friend-name">姓名 (唯一ID, 必填)</label>
                            <input type="text" id="add-friend-name" placeholder="为AI好友起个名字">
                        </div>
                        <div class="form-group">
                            <label for="add-friend-remark">备注 (选填)</label>
                            <input type="text" id="add-friend-remark" placeholder="你对TA的称呼">
                        </div>
                        <div class="form-group">
                            <label for="add-friend-gender">性别 (必填)</label>
                            <select id="add-friend-gender">
                                <option value="男">男</option>
                                <option value="女">女</option>
                                <option value="其他">其他</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="add-friend-likes">喜好 (选填)</label>
                            <textarea id="add-friend-likes" placeholder="例如：甜食、运动、旅游"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="add-friend-dislikes">厌恶 (选填)</label>
                            <textarea id="add-friend-dislikes" placeholder="例如：被忽视、下雨"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="add-friend-habits">习惯 (选填)</label>
                            <textarea id="add-friend-habits" placeholder="例如：晨跑、运动"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="add-friend-background">背景资料 (选填)</label>
                            <textarea id="add-friend-background" placeholder="角色的其他资料"></textarea>
                        </div>
                    `,
                actions: [
                    {
                        text: '取消', class: 'btn-secondary', handler: () => {
                            UIManager.hideModal();
                            this.showAddMenu();
                        }
                    },
                    {
                        text: '添加', class: 'btn-primary', handler: async () => {
                            const name = $('#add-friend-name').value.trim();
                            if (!name) {
                                this.showAddMenu();
                                UIManager.showModal({
                                    title: "提示",
                                    body: `<p>好友的姓名不能为空哦。</p>`,
                                    actions: [{ text: '好的', class: 'btn-primary', handler: () => UIManager.hideModal() }]
                                });
                                return;
                            }


                            const existing = await DBHelper.getAll('contacts', 'name');
                            if (existing.some(c => c.name === name)) {
                                this.showAddMenu();
                                UIManager.showModal({
                                    title: "提示",
                                    body: `<p>姓名 "${name}" 已经被其他好友占用了，换一个吧。</p>`,
                                    actions: [{ text: '好的', class: 'btn-primary', handler: () => UIManager.hideModal() }]
                                });
                                return;
                            }

                            const newContact = {
                                id: Utils.generateId('contact'),
                                createdAt: Date.now(),
                                name,
                                avatar: $('#add-friend-avatar-preview').src,
                                remark: $('#add-friend-remark').value.trim(),
                                gender: $('#add-friend-gender').value,
                                likes: $('#add-friend-likes').value.trim(),
                                dislikes: $('#add-friend-dislikes').value.trim(),
                                habits: $('#add-friend-habits').value.trim(),
                                background: $('#add-friend-background').value.trim()
                            };

                            await DBHelper.put('contacts', newContact);
                            UIManager.hideModal();
                            await UIManager.renderContactsPage();
                        }
                    }
                ]
            });

            $('#add-friend-avatar-input').addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    $('#add-friend-avatar-preview').src = await Utils.fileToBase64(file);
                }
            });
        },

        async handleCreateGroup() {
            const friends = await DBHelper.getAll('contacts');
            if (friends.length === 0) {
                this.showAddMenu();
                UIManager.showModal({
                    title: "提示",
                    body: `<p>通讯录中还没有好友，快去添加一些好友再来创建群聊吧！</p>`,
                    actions: [{ text: '好的', class: 'btn-primary', handler: () => UIManager.hideModal() }]
                });
                return;
            }

            const myProfile = await DBHelper.get('profile', 'myProfile');
            const defaultAvatar = Utils.createAvatarDataUrl(Utils.getRandomColor());

            const memberListHtml = friends.map(f => `
                    <label class="member-select-item">
                        <input type="checkbox" name="group-members" value="${f.id}">
                        <img src="${f.avatar}" class="contact-item-avatar" style="width:30px;height:30px;margin-right:10px;">
                        <span>${f.remark || f.name}</span>
                    </label>
                `).join('');


            const creatorOptionsHtml = `<option value="${myProfile.id}">我 (${myProfile.name})</option>` + friends.map(f =>
                `<option value="${f.id}">${f.remark || f.name}</option>`
            ).join('');

            UIManager.showModal({
                title: "新建群聊",
                body: `
                         <div class="form-group">
                            <label>群头像 (选填)</label>
                            <div class="avatar-uploader">
                                <img src="${defaultAvatar}" id="create-group-avatar-preview" class="avatar-preview">
                                <input type="file" id="create-group-avatar-input" accept="image/*" style="display:none;">
                                <button class="upload-btn" onclick="document.getElementById('create-group-avatar-input').click()">上传头像</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="create-group-name">群名称 (必填)</label>
                            <input type="text" id="create-group-name" placeholder="为群聊起个名字">
                        </div>
                        <div class="form-group">
                            <label for="create-group-creator">选择群主 (必填)</label>
                            <select id="create-group-creator">${creatorOptionsHtml}</select>
                        </div>
                        <div class="form-group">
                            <label>选择群成员</label>
                            <div class="member-select-list">${memberListHtml}</div>
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '创建', class: 'btn-primary', handler: async () => {
                            const name = $('#create-group-name').value.trim();
                            if (!name) {
                                UIManager.showModal({
                                    title: "提示",
                                    body: `<p>群聊还没有名字呢，给它起一个吧。</p>`,
                                    actions: [{ text: '好的', class: 'btn-primary', handler: () => UIManager.hideModal() }]
                                });
                                return;
                            }

                            const selectedMembers = [...$$('input[name="group-members"]:checked')].map(cb => cb.value);
                            if (selectedMembers.length < 1) {
                                UIManager.showModal({
                                    title: "提示",
                                    body: `<p>创建群聊至少需要选择一位好友哦。</p>`,
                                    actions: [{ text: '好的', class: 'btn-primary', handler: () => UIManager.hideModal() }]
                                });
                                return;
                            }

                            const creatorId = $('#create-group-creator').value;

                            const myProfile = await DBHelper.get('profile', 'myProfile');

                            if (creatorId !== myProfile.id && !selectedMembers.includes(creatorId)) {
                                selectedMembers.push(creatorId);
                            }

                            const newGroup = {
                                id: Utils.generateId('group'),
                                createdAt: Date.now(),
                                name,
                                avatar: $('#create-group-avatar-preview').src,
                                members: selectedMembers,
                                creatorId: creatorId
                            };

                            await DBHelper.put('groups', newGroup);


                            try {
                                const creatorContact = creatorId === myProfile.id ? myProfile : await DBHelper.get('contacts', creatorId);
                                const memberNames = (await Promise.all(
                                    selectedMembers.map(id => DBHelper.get('contacts', id))
                                )).filter(Boolean).map(c => c.name).join('、');


                                const creatorNameForScene = creatorContact ? creatorContact.name : "一位神秘的朋友";
                                const defaultSceneContent = `${creatorNameForScene} 创建了群聊 “${newGroup.name}”，群聊成员有：${memberNames}、${myProfile.name}。现在，大家开始积极发言吧！`;
                                const defaultScene = {
                                    id: Utils.generateId('scene'),
                                    groupId: newGroup.id,
                                    name: '默认开场白',
                                    content: defaultSceneContent
                                };
                                await DBHelper.put('openingScenes', defaultScene);
                            } catch (e) {
                                console.error("创建默认开场白失败:", e);
                            }

                            UIManager.hideModal();
                            await UIManager.renderContactsPage('groups');
                        }
                    }
                ]
            });

            $('#create-group-avatar-input').addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    $('#create-group-avatar-preview').src = await Utils.fileToBase64(file);
                }
            });
        },

        async handleSortContacts() {
            appState.contactsSortOrder = appState.contactsSortOrder === 'asc' ? 'desc' : 'asc';
            await UIManager.renderContactsPage('friends');
        },

        async handleSortGroups() {
            appState.groupsSortOrder = appState.groupsSortOrder === 'asc' ? 'desc' : 'asc';
            await UIManager.renderContactsPage('groups');
        },

        handleImportData() {
            const fileInput = $('#import-data-input');
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = async (event) => {
                    try {
                        const data = JSON.parse(event.target.result);
                        await this.processImportedFile(data);
                    } catch (error) {
                        console.error("导入失败:", error);
                        UIManager.showToast("文件解析失败，请检查文件格式。");
                    } finally {
                        fileInput.value = '';
                    }
                };
                reader.readAsText(file);
            };
            fileInput.click();
        },

        async processImportedFile(data) {
            if (data.type === 'contact' && data.contactData) {
                const existingContacts = await DBHelper.getAll('contacts');
                const conflict = existingContacts.find(c => c.name === data.contactData.name);
                if (conflict) {
                    this.handleCharacterImportConflict(data, conflict);
                } else {
                    const importedContact = data.contactData;
                    // Use the original ID from the imported file
                    const newContact = { ...importedContact, createdAt: Date.now() };
                    delete newContact.openingScenes; // Avoid storing scenes inside contact object

                    await DBHelper.put('contacts', newContact);
                    await this.importOpeningScenes(importedContact.openingScenes, newContact.id, false);

                    if (data.chatHistory && data.participants) {
                        // Since we are using the original ID, no mapping is needed for history
                        const reconstructedHistory = await this.reconstructChatHistory(data.chatHistory, data.participants);
                        const newChatData = { ...reconstructedHistory, chatId: newContact.id };
                        await DBHelper.put('chats', newChatData);
                    }

                    UIManager.showToast(`角色 "${newContact.name}" 导入成功！`);
                    if (newContact.author) {
                        EventManager.showAttributionModal(newContact);
                    }
                    await UIManager.renderContactsPage();
                }
            } else if (data.type === 'group' && data.groupData && data.memberData) {
                const existingContacts = await DBHelper.getAll('contacts');
                const conflictingMembers = data.memberData.filter(im => existingContacts.some(ec => ec.name === im.name));

                if (conflictingMembers.length > 0) {
                    this.handleGroupImportConflict(data, conflictingMembers);
                } else {
                    // Import members with their original IDs
                    for (const member of data.memberData) {
                        const newMember = { ...member, createdAt: Date.now() };
                        delete newMember.openingScenes;
                        await DBHelper.put('contacts', newMember);
                        await this.importOpeningScenes(member.openingScenes, member.id, false);
                    }

                    // Import the group, checking for its own ID conflict
                    const importedGroup = data.groupData;
                    const existingGroup = await DBHelper.get('groups', importedGroup.id);

                    const newGroup = {
                        ...importedGroup,
                        createdAt: Date.now()
                    };
                    // If group ID conflicts, generate a new one
                    if (existingGroup) {
                        newGroup.id = Utils.generateId('group');
                    }
                    delete newGroup.openingScenes;

                    await DBHelper.put('groups', newGroup);

                    // Import chat history. Since member IDs are preserved, no mapping is needed.
                    if (data.chatHistory && data.participants) {
                        const reconstructedHistory = await this.reconstructChatHistory(data.chatHistory, data.participants);
                        const newChatData = { ...reconstructedHistory, chatId: newGroup.id };
                        await DBHelper.put('chats', newChatData);
                    }

                    await this.importOpeningScenes(importedGroup.openingScenes, newGroup.id, true);
                    UIManager.showToast(`群聊 "${newGroup.name}" 及所有成员导入成功！`);
                    if (newGroup.author) {
                        EventManager.showAttributionModal(newGroup);
                    }
                    await UIManager.renderContactsPage('groups');
                }
            } else {
                UIManager.showToast("导入失败：文件类型未知或数据不完整。");
            }
        },

        handleCharacterImportConflict(data, existingContact) {
            const importedContact = data.contactData;
            UIManager.showModal({
                title: "角色冲突",
                body: `<p>通讯录中已存在名为 <strong>${existingContact.name}</strong> 的角色。<br><strong>更新</strong>：不清除原消息记录<br><strong>覆盖</strong>：清除该角色原来的消息记录<br>请选择操作：</p>`,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '更新角色', class: 'btn-primary', handler: async () => {
                            const updatedContact = { ...existingContact, ...importedContact, id: existingContact.id };
                            delete updatedContact.openingScenes;
                            await DBHelper.put('contacts', updatedContact);

                            const oldScenes = (await DBHelper.getAll('openingScenes')).filter(s => s.contactId === existingContact.id);
                            for (const scene of oldScenes) {
                                await DBHelper.delete('openingScenes', scene.id);
                            }
                            await this.importOpeningScenes(importedContact.openingScenes, existingContact.id, false);

                            UIManager.hideModal();
                            UIManager.showToast(`角色 "${existingContact.name}" 已更新。`);
                            if (updatedContact.author) EventManager.showAttributionModal(updatedContact);
                            await UIManager.renderContactsPage();
                        }
                    },
                    {
                        text: '覆盖角色', class: 'btn-danger', handler: async () => {
                            // Delete existing data associated with the conflicting contact
                            await DBHelper.delete('chats', existingContact.id);
                            const oldScenes = (await DBHelper.getAll('openingScenes')).filter(s => s.contactId === existingContact.id);
                            for (const scene of oldScenes) {
                                await DBHelper.delete('openingScenes', scene.id);
                            }
                            await DBHelper.delete('contacts', existingContact.id);

                            // Re-import with the original ID
                            const newContact = { ...importedContact, id: importedContact.id, createdAt: Date.now() };
                            delete newContact.openingScenes;
                            await DBHelper.put('contacts', newContact);

                            // Import history using original ID
                            if (data.chatHistory && data.participants) {
                                const reconstructedHistory = await this.reconstructChatHistory(data.chatHistory, data.participants);
                                const newChatData = { ...reconstructedHistory, chatId: newContact.id };
                                await DBHelper.put('chats', newChatData);
                            }

                            await this.importOpeningScenes(importedContact.openingScenes, newContact.id, false);

                            UIManager.hideModal();
                            UIManager.showToast(`角色 "${newContact.name}" 已被覆盖。`);
                            if (newContact.author) EventManager.showAttributionModal(newContact);
                            await UIManager.renderContactsPage();
                        }
                    }
                ]
            });
        },

        handleGroupImportConflict(data, conflictingMembers) {
            const importedGroup = data.groupData;
            const importedMembers = data.memberData;
            const conflictNames = conflictingMembers.map(m => m.name).join('、');
            UIManager.showModal({
                title: "群聊成员冲突",
                body: `<p>在导入群聊 <strong>${importedGroup.name}</strong> 时，发现以下成员已存在于你的通讯录中：<br><strong>${conflictNames}</strong><br>请选择如何处理这些冲突的角色。<br><strong>更新</strong>：不清除原消息记录<br><strong>覆盖</strong>：清除该角色原来的消息记录</p>`,
                actions: [
                    { text: '取消导入', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '全部更新', class: 'btn-primary', handler: async () => {
                            const existingContacts = await DBHelper.getAll('contacts');
                            const memberIdMap = {};
                            for (const member of importedMembers) {
                                const existing = existingContacts.find(c => c.name === member.name);
                                let finalMember;
                                if (existing) {
                                    finalMember = { ...existing, ...member, id: existing.id };
                                    delete finalMember.openingScenes;
                                    await DBHelper.put('contacts', finalMember);
                                    const oldScenes = (await DBHelper.getAll('openingScenes')).filter(s => s.contactId === existing.id);
                                    for (const scene of oldScenes) await DBHelper.delete('openingScenes', scene.id);
                                    await this.importOpeningScenes(member.openingScenes, existing.id, false);
                                } else {
                                    finalMember = { ...member, id: Utils.generateId('contact'), createdAt: Date.now() };
                                    delete finalMember.openingScenes;
                                    await DBHelper.put('contacts', finalMember);
                                    await this.importOpeningScenes(member.openingScenes, finalMember.id, false);
                                }
                                memberIdMap[member.id] = finalMember.id;
                            }

                            const newMemberIds = importedGroup.members.map(oldId => memberIdMap[oldId]).filter(Boolean);
                            const newCreatorId = memberIdMap[importedGroup.creatorId] || importedGroup.creatorId;
                            const newGroup = { ...importedGroup, id: Utils.generateId('group'), createdAt: Date.now(), members: newMemberIds, creatorId: newCreatorId };
                            delete newGroup.openingScenes;

                            await DBHelper.put('groups', newGroup);
                            await this.importOpeningScenes(importedGroup.openingScenes, newGroup.id, true);
                            UIManager.hideModal();
                            UIManager.showToast(`群聊 "${importedGroup.name}" 导入成功，冲突成员已更新。`);
                            if (importedGroup.author) EventManager.showAttributionModal(importedGroup);
                            await UIManager.renderContactsPage('groups');
                        }
                    },
                    {
                        text: '全部覆盖', class: 'btn-danger', handler: async () => {
                            const existingContacts = await DBHelper.getAll('contacts');
                            const existingGroups = await DBHelper.getAll('groups');

                            // Delete existing group if name conflicts
                            const oldGroup = existingGroups.find(g => g.name === importedGroup.name);
                            if (oldGroup) {
                                await DBHelper.delete('chats', oldGroup.id);
                                await DBHelper.delete('groups', oldGroup.id);
                            }

                            // Delete conflicting members and their data
                            for (const member of importedMembers) {
                                const existing = existingContacts.find(c => c.name === member.name);
                                if (existing) {
                                    await DBHelper.delete('chats', existing.id);
                                    const oldScenes = (await DBHelper.getAll('openingScenes')).filter(s => s.contactId === existing.id);
                                    for (const scene of oldScenes) await DBHelper.delete('openingScenes', scene.id);
                                    await DBHelper.delete('contacts', existing.id);
                                }
                            }

                            // Now import all members with their original IDs
                            for (const member of importedMembers) {
                                const newMember = { ...member, createdAt: Date.now() };
                                delete newMember.openingScenes;
                                await DBHelper.put('contacts', newMember);
                                await this.importOpeningScenes(member.openingScenes, member.id, false);
                            }

                            // Import the group, checking for its own ID conflict
                            const groupToImport = { ...importedGroup, createdAt: Date.now() };
                            const groupWithSameIdExists = await DBHelper.get('groups', groupToImport.id);
                            if (groupWithSameIdExists) {
                                groupToImport.id = Utils.generateId('group');
                            }
                            delete groupToImport.openingScenes;

                            await DBHelper.put('groups', groupToImport);

                            // Import chat history. Since member IDs are preserved, no mapping is needed.
                            if (data.chatHistory && data.participants) {
                                const reconstructedHistory = await this.reconstructChatHistory(data.chatHistory, data.participants);
                                const newChatData = { ...reconstructedHistory, chatId: groupToImport.id };
                                await DBHelper.put('chats', newChatData);
                            }

                            await this.importOpeningScenes(importedGroup.openingScenes, groupToImport.id, true);
                            UIManager.hideModal();
                            UIManager.showToast(`群聊 "${importedGroup.name}" 导入成功，冲突成员已被覆盖。`);
                            if (importedGroup.author) EventManager.showAttributionModal(importedGroup);
                            await UIManager.renderContactsPage('groups');
                        }
                    }
                ]
            });
        },


        showAttributionModal(entity) {
            UIManager.showModal({
                title: "作者信息",
                body: `
                        <div class="details-card">
                            <div class="details-field">
                                <span class="label">来源于</span>
                                <span class="value">${entity.author}</span>
                            </div>
                            <div class="details-section" style="margin-top: 15px;">
                                <div class="details-section-title">作者有话说</div>
                                <p>${entity.authorWords || '作者很懒，什么都没留下...'}</p>
                            </div>
                        </div>
                    `,
                actions: [{ text: '好的', class: 'btn-primary', handler: () => UIManager.hideModal() }]
            });
        },

        async reconstructChatHistory(chatHistory, participants) {
            if (!chatHistory || !chatHistory.history || !participants) {
                return chatHistory;
            }

            const participantMap = participants.reduce((map, p) => {
                map[p.id] = p;
                return map;
            }, {});

            chatHistory.history.forEach(msg => {
                if (msg.senderId && participantMap[msg.senderId]) {
                    msg.senderInfo = participantMap[msg.senderId];
                }
            });

            return chatHistory;
        },

        async handleExportContact(contactId) {
            const contact = await DBHelper.get('contacts', contactId);
            const allOpeningScenes = await DBHelper.getAll('openingScenes');
            contact.openingScenes = allOpeningScenes.filter(s => s.contactId === contactId);
            this.showExportModal(contact, false);
        },

        async handleExportGroup(groupId) {
            const group = await DBHelper.get('groups', groupId);
            const allContacts = await DBHelper.getAll('contacts');
            const membersData = group.members.map(id => allContacts.find(c => c.id === id)).filter(Boolean);
            const allOpeningScenes = await DBHelper.getAll('openingScenes');
            group.openingScenes = allOpeningScenes.filter(s => s.groupId === groupId);

            const exportPackage = {
                groupData: group,
                memberData: membersData
            };
            this.showExportModal(exportPackage, true);
        },

        showExportModal(entity, isGroup) {
            const myProfile = { name: '你' };
            const targetEntity = isGroup ? entity.groupData : entity;

            const authorName = targetEntity.author || myProfile.name;
            const authorWords = targetEntity.authorWords || '';
            const isAuthorFixed = !!targetEntity.author;

            UIManager.showModal({
                title: `导出${isGroup ? '群聊' : '角色'}`,
                body: `
                        <div class="form-group">
                            <label for="export-author-name">作者名</label>
                            <input type="text" id="export-author-name" value="${authorName}" ${isAuthorFixed ? 'disabled' : ''}>
                        </div>
                        <div class="form-group">
                            <label for="export-author-words">作者有话说 (选填)</label>
                            <textarea id="export-author-words" rows="3">${authorWords}</textarea>
                        </div>
                        <div class="form-group" style="display: flex; align-items: center; justify-content: center; padding-top: 10px;">
                            <input type="checkbox" id="export-chat-history-checkbox" style="width: 16px; height: 16px; margin-right: 8px;">
                            <label for="export-chat-history-checkbox" style="margin: 0; cursor: pointer;">同时导出聊天记录</label>
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '保存并导出', class: 'btn-primary', handler: async () => {
                            const newAuthorName = $('#export-author-name').value.trim();
                            const newAuthorWords = $('#export-author-words').value.trim();
                            const includeHistory = $('#export-chat-history-checkbox').checked;

                            let exportData;
                            let chatId;

                            if (isGroup) {
                                entity.groupData.author = newAuthorName;
                                entity.groupData.authorWords = newAuthorWords;
                                exportData = { type: 'group', ...entity };
                                chatId = entity.groupData.id;
                            } else {
                                entity.author = newAuthorName;
                                entity.authorWords = newAuthorWords;
                                exportData = { type: 'contact', contactData: entity };
                                chatId = entity.id;
                            }

                            if (includeHistory) {
                                const chatHistory = await DBHelper.get('chats', chatId);
                                if (chatHistory && chatHistory.history) {
                                    const participants = {};
                                    const myProfile = await DBHelper.get('profile', 'myProfile');
                                    const allContacts = await DBHelper.getAll('contacts');

                                    participants[myProfile.id] = myProfile;

                                    for (const msg of chatHistory.history) {
                                        if (msg.senderId && !participants[msg.senderId]) {
                                            const senderInfo = allContacts.find(c => c.id === msg.senderId);
                                            if (senderInfo) {
                                                participants[msg.senderId] = senderInfo;
                                            }
                                        }
                                        delete msg.senderInfo;
                                    }

                                    exportData.chatHistory = chatHistory;
                                    exportData.participants = Object.values(participants);
                                }
                            }

                            const filename = `${isGroup ? entity.groupData.name : entity.name}_${new Date().toISOString().slice(0, 10)}.json`;
                            const jsonString = JSON.stringify(exportData, null, 2);
                            const blob = new Blob([jsonString], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);

                            const a = document.createElement('a');
                            a.href = url;
                            a.download = filename;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                            UIManager.hideModal();
                        }
                    }
                ]
            });
        },

        handleResetApp() {
            UIManager.showModal({
                title: '确认重置',
                body: `<p>此操作将删除所有数据，包括你的个人信息、联系人、群聊、聊天记录和API配置，且无法恢复。你确定要继续吗？</p>`,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '确认重置', class: 'btn-danger', handler: () => {
                            indexedDB.deleteDatabase(DBHelper.DB_NAME);
                            UIManager.hideModal();
                            UIManager.showModal({
                                title: "操作成功",
                                body: `<p>应用已重置，所有数据已被清除。页面即将刷新...</p><p>如果没有反应，请手动刷新。</p>`,
                                actions: [{ text: '立即刷新', class: 'btn-primary', handler: () => window.location.reload() }]
                            });
                            setTimeout(() => window.location.reload(), 3000);
                        }
                    }
                ]
            });
        },


        async applyBackgroundSettings() {
            const settings = await DBHelper.get('apiConfig', 'themeSettings') || {};
            const appContainer = $('#app-container');
            if (settings.appBackground) {
                appContainer.style.backgroundImage = `url(${settings.appBackground})`;
            } else {
                appContainer.style.backgroundImage = '';
            }
        },

        async applyFontSettings() {
            const settings = await DBHelper.get('apiConfig', 'themeSettings') || {};
            const root = document.documentElement;
            const fontSettings = settings.fonts || {};
            const customFonts = settings.customFonts || {};

            const fontTypes = {
                Global: '--font-main',
                Bubble: '--font-bubble',
                InnerVoice: '--font-inner-voice',
                Essay: '--font-essay'
            };


            const defaultFontValues = {
                global: '"SimSun", "宋体", serif',
                bubble: '"LXGW WenKai Screen", "Kaiti", "楷体", serif',
                innervoice: '"Long Cang", cursive',
                essay: '"Long Cang", cursive'
            };

            for (const [type, cssVar] of Object.entries(fontTypes)) {
                const typeKey = type.toLowerCase();
                const setting = fontSettings[typeKey];

                if (setting && setting.type === 'custom' && customFonts[setting.value]) {

                    const customFont = customFonts[setting.value];
                    root.style.setProperty(cssVar, `"${customFont.name}", sans-serif`);
                } else if (setting && setting.type === 'builtin') {

                    root.style.setProperty(cssVar, setting.value);
                } else {




                    root.style.setProperty(cssVar, defaultFontValues[typeKey]);
                }
            }
        },

        async loadAndApplyFontsInBackground() {

            try {
                await this.loadCustomFontsOnStartup();
                await this.applyFontSettings();
                console.log("Custom fonts and settings applied in the background.");
            } catch (error) {
                console.error("Failed to load and apply fonts in background:", error);
            }
        },


        async renderThemeSettingsPage() {
            const contentArea = $('#theme-settings-content');
            const settings = await DBHelper.get('apiConfig', 'themeSettings') || {};
            const chatSettings = await DBHelper.get('apiConfig', 'chatSettings') || {};
            appState.theme = chatSettings.theme || 'neumorphic';

            const bubbleStyles = {
                'default': { name: '默认', type: 'A', style: 'background: white; border: 2px solid var(--player-bubble-bg);' },
                '3d': { name: '立体3D', type: 'A', style: 'background: var(--player-bubble-bg); border-bottom: 3px solid rgba(0,0,0,0.2); border-radius: 12px;' },
                'neumorphic': { name: '拟态', type: 'A', style: 'background: var(--player-bubble-bg); box-shadow: 6px 6px 12px #b8b9be, -6px -6px 12px #fff; color: #555;' },
                'stripes': { name: '柔和条纹', type: 'A', style: 'background-color: var(--player-bubble-bg); background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2) 15px, rgba(255, 255, 255, 0.1) 15px, rgba(255, 255, 255, 0.1) 30px);' },
                'grid': { name: '网格', type: 'A', style: 'background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px); background-color: color-mix(in srgb, var(--player-bubble-bg) 80%, transparent);' },
                'cute': { name: '可爱风', type: 'A', style: 'background: transparent; border: 2px solid var(--player-bubble-bg); border-radius: 25px 25px 5px 25px;' },
                'frosted-glass': { name: '毛玻璃', type: 'A', style: 'background-color: color-mix(in srgb, var(--player-bubble-bg) 25%, transparent); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.2);' },
                'neumorphic-2': { name: '拟态2', type: 'B', style: 'background: #F0F0F3; box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.9), 5px 5px 9px rgba(174, 174, 192, 0.4);' },
                'ancient': { name: '古风', type: 'B', style: 'background: #f5f0e1; color: #5d4037; border: 2px solid #8d6e63;' },
                'chinese': { name: '国风', type: 'B', style: 'background: #c81e1e; border: 1px solid #f9d56e; color: #f9d56e;' },
                'doodle': { name: '手绘涂鸦', type: 'B', style: 'background: white; border: 2px solid #333; color: #333; box-shadow: 3px 3px 0px #ccc; border-radius: 15px 10px 15px 12px;' },
                'hand-drawn': { name: '手绘涂鸦2', type: 'B', style: 'background: white; border: 3px solid #333; box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1); font-family: "Comic Sans MS", cursive; color: #333;' },
                'stripey': { name: '可爱条纹', type: 'B', style: 'background: repeating-linear-gradient(45deg, #FFC0CB, #FFC0CB 10px, #F8C8D1 10px, #F8C8D1 20px);' },
                'gradient': { name: '渐变彩虹', type: 'B', style: 'background: linear-gradient(45deg, #a1c4fd, #c2e9fb, #ff9a9e, #a1c4fd); animation: gradientBG 8s ease infinite; background-size: 300% 300%;' },
                'glow-jelly': { name: '发光果冻', type: 'B', style: 'background: linear-gradient(135deg, #ff7e5f, #feb47b); box-shadow: 0 0 15px rgba(255, 126, 95, 0.7);' },
                'metal': { name: '金属质感', type: 'B', style: 'background: linear-gradient(145deg, #e0e0e0, #c0c0c0);' },
                'ocean': { name: '海洋风', type: 'B', style: 'background: linear-gradient(160deg, #0077b6, #00b4d8);' },
                'paw': { name: '猫爪风', type: 'B', style: 'background: #fce1cb; color: #8b5e34;' },
            };

            const currentStyle = settings.bubbleStyle || 'default';
            let bubbleStyleOptionsHTML = '';
            for (const [key, value] of Object.entries(bubbleStyles)) {
                bubbleStyleOptionsHTML += `
                    <div class="bubble-style-option ${currentStyle === key ? 'selected' : ''}" data-style-key="${key}">
                        <div class="bubble-style-preview" style="${value.style}"><span>${value.type}</span></div>
                        <span>${value.name}</span>
                    </div>
                `;
            }


            const fontSizeOptions = {
                'small': { name: '小', value: '0.8rem' },
                'normal-small': { name: '较小', value: '0.88rem' },
                'default': { name: '默认', value: '0.95rem' },
                'normal-large': { name: '较大', value: '1.05rem' },
                'large': { name: '大', value: '1.15rem' }
            };
            const currentFontSizeKey = settings.bubbleFontSize || 'default';
            const fontSizeRadioHTML = Object.entries(fontSizeOptions).map(([key, value]) => `
                <label style="cursor:pointer;"><input type="radio" name="font-size-radio" value="${key}" ${currentFontSizeKey === key ? 'checked' : ''}> ${value.name}</label>
            `).join('');


            contentArea.innerHTML = `
                <style>
                    
                    .theme-setting-card .color-input-group { display: flex; flex-direction: column; align-items: center; gap: 8px; }
                    .theme-setting-card .color-input-group label { font-size: 0.9rem; color: var(--text-color-medium); margin-bottom: 0; }
                    .theme-setting-card .color-input-group input[type="color"] { width: 40px; height: 40px; border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer; padding: 0; background-color: transparent; -webkit-appearance: none; -moz-appearance: none; appearance: none; }
                    .theme-setting-card .color-input-group input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
                    .theme-setting-card .color-input-group input[type="color"]::-webkit-color-swatch { border: none; border-radius: 6px; }
                    .bubble-style-options-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 15px; justify-content: center; margin-top: 10px; }
                    .bubble-style-option { display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 10px; border-radius: 10px; border: 2px solid transparent; transition: all 0.3s ease; background-color: rgba(0,0,0,0.03); }
                    .bubble-style-option.selected { border-color: var(--accent-color); transform: scale(1.05); }
                    .bubble-style-option:hover { background-color: rgba(0,0,0,0.06); }
                    .bubble-style-preview { width: 80px; height: 40px; border-radius: 10px; margin-bottom: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.05); display: flex; justify-content: center; align-items: center; font-size: 0.8rem; color: white; text-shadow: 1px 1px 1px rgba(0,0,0,0.2); font-weight: bold; }
                    .bubble-style-option span { font-size: 0.9rem; color: var(--text-color-dark); text-align: center; }
                    .bubble-style-preview span { color: white; }
                </style>
                <div class="theme-setting-card">
                    <h3>弹窗风格</h3>
                    <div style="display: flex; justify-content: space-around; padding-top: 10px;">
                        <label style="cursor:pointer;"><input type="radio" name="modal-theme" value="default" ${appState.theme !== 'neumorphic' ? 'checked' : ''}> 默认</label>
                        <label style="cursor:pointer;"><input type="radio" name="modal-theme" value="neumorphic" ${appState.theme === 'neumorphic' ? 'checked' : ''}> 拟态</label>
                    </div>
                </div>
                <div class="theme-setting-card">
                    <h3>通用设置</h3>
                    <div class="theme-setting-group">
                       <button id="font-settings-btn" class="theme-page-btn">字体设置</button>
                       <button id="background-settings-btn" class="theme-page-btn">背景与封面</button>
                    </div>
                </div>
                <div class="theme-setting-card">
                    <h3>聊天气泡样式</h3>
                    <div id="bubble-style-options" class="bubble-style-options-container">${bubbleStyleOptionsHTML}</div>
                </div>
                <div class="theme-setting-card">
                    <h3>聊天字体大小</h3>
                    <div id="font-size-radio-group" style="display: flex; justify-content: space-around; padding-top: 10px;">
                        ${fontSizeRadioHTML}
                    </div>
                    <p style="font-size: 0.8rem; color: var(--text-color-light); text-align: center; margin-top: 10px; padding: 0 15px;">
                        聊天字体大小同时还取决于自定义字体因素影响
                    </p>
                </div>
                <div class="theme-setting-card" id="bubble-color-card">
                    <h3>气泡颜色 (限A类气泡)</h3>
                    <div style="display: flex; justify-content: space-around; align-items: center; gap: 20px; margin-top: 15px;">
                        <div class="color-input-group">
                            <label for="friend-bubble-bg-color">好友消息背景</label>
                            <input type="color" id="friend-bubble-bg-color" value="${settings.friendBubbleBg || '#FFFFFF'}">
                        </div>
                        <div class="color-input-group">
                            <label for="player-bubble-bg-color">我的消息背景</label>
                            <input type="color" id="player-bubble-bg-color" value="${settings.playerBubbleBg || '#A7C7E7'}">
                        </div>
                    </div>
                </div>
                 <div class="theme-setting-card">
                    <h3>聊天气泡字体颜色</h3>
                     <div style="display: flex; justify-content: space-around; align-items: center; gap: 20px; margin-top: 15px;">
                        <div class="color-input-group">
                            <label for="friend-bubble-text-color">好友消息</label>
                            <input type="color" id="friend-bubble-text-color" value="${settings.friendBubbleTextColor || '#5D534A'}">
                        </div>
                        <div class="color-input-group">
                            <label for="player-bubble-text-color">我的消息</label>
                            <input type="color" id="player-bubble-text-color" value="${settings.playerBubbleTextColor || '#FFFFFF'}">
                        </div>
                    </div>
                </div>
            `;

            $('#theme-settings-back-btn').onclick = () => UIManager.navigateTo('settings');


            $('#font-size-radio-group').onchange = async (e) => {
                if (e.target.name === 'font-size-radio') {
                    const sizeKey = e.target.value;
                    const settingsToSave = await DBHelper.get('apiConfig', 'themeSettings') || { id: 'themeSettings' };
                    settingsToSave.bubbleFontSize = sizeKey;
                    await DBHelper.put('apiConfig', settingsToSave);
                    await this.applyBubbleFontSize();
                }
            };

            const saveBubbleSettings = async () => {
                const settingsToSave = await DBHelper.get('apiConfig', 'themeSettings') || { id: 'themeSettings' };
                settingsToSave.bubbleStyle = document.querySelector('.bubble-style-option.selected').dataset.styleKey;
                settingsToSave.friendBubbleBg = $('#friend-bubble-bg-color').value;
                settingsToSave.playerBubbleBg = $('#player-bubble-bg-color').value;
                settingsToSave.friendBubbleTextColor = $('#friend-bubble-text-color').value;
                settingsToSave.playerBubbleTextColor = $('#player-bubble-text-color').value;
                await DBHelper.put('apiConfig', settingsToSave);
                await this.applyBubbleSettings();
            };

            $$('input[name="modal-theme"]').forEach(radio => {
                radio.onchange = async (e) => {
                    appState.theme = e.target.value;
                    const settingsToSave = await DBHelper.get('apiConfig', 'chatSettings') || { id: 'chatSettings' };
                    settingsToSave.theme = appState.theme;
                    await DBHelper.put('apiConfig', settingsToSave);
                };
            });


            $('#bubble-style-options').onclick = (e) => {
                const option = e.target.closest('.bubble-style-option');
                if (!option) return;

                $$('.bubble-style-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                const isTypeA = bubbleStyles[option.dataset.styleKey].type === 'A';
                $('#bubble-color-card').style.display = isTypeA ? 'block' : 'none';
                saveBubbleSettings();
            };

            ['friend-bubble-bg-color', 'player-bubble-bg-color', 'friend-bubble-text-color', 'player-bubble-text-color'].forEach(id => {
                $(`#${id}`).oninput = saveBubbleSettings;
            });

            const initialStyleIsTypeA = bubbleStyles[currentStyle].type === 'A';
            $('#bubble-color-card').style.display = initialStyleIsTypeA ? 'block' : 'none';

            $('#font-settings-btn').onclick = () => this.handleFontSettings();

            $('#background-settings-btn').onclick = () => {
                UIManager.showModal({
                    title: "背景与封面",
                    body: `
                        <div class="settings-list" style="padding:0; margin:0 -10px;">
                            <div class="setting-item" id="modal-bg-settings-btn-nav" style="cursor:pointer;">
                                <i class="fas fa-desktop"></i><span>应用/聊天背景</span><i class="fas fa-chevron-right"></i>
                            </div>
                            <div class="setting-item" id="modal-cover-settings-btn-nav" style="cursor:pointer;">
                                <i class="fas fa-photo-video"></i><span>自定义封面</span><i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                    `,
                    actions: [{ text: '关闭', class: 'btn-secondary', handler: () => UIManager.hideModal() }]
                });

                $('#modal-bg-settings-btn-nav').addEventListener('click', () => {
                    UIManager.hideModal();
                    this.handleBackgroundSettings();
                });
                $('#modal-cover-settings-btn-nav').addEventListener('click', () => {
                    UIManager.hideModal();
                    this.handleCoverSettings();
                });
            };
        },

        async handleBackgroundSettings() {
            const settings = await DBHelper.get('apiConfig', 'themeSettings') || {};
            const createUploadHTML = (type, title, previewSrc, dbKey) => `
                <div class="theme-upload-item">
                    <span>${title}</span>
                    <div class="theme-upload-preview-wrapper">
                        <img src="${previewSrc || ''}" id="${type}-preview" class="theme-upload-preview" style="${previewSrc ? '' : 'display:none;'}">
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <input type="file" id="${type}-input" accept="image/*" style="display: none;">
                        <button class="theme-page-btn" onclick="document.getElementById('${type}-input').click()">上传</button>
                        <button class="theme-page-btn" id="${type}-remove-btn" style="${previewSrc ? '' : 'display:none;'}">移除</button>
                    </div>
                </div>`;

            UIManager.showModal({
                title: '背景设置',
                body: `
                    <div class="theme-setting-group" style="padding: 10px 0;">
                        ${createUploadHTML('app-bg', '主题背景', settings.appBackground, 'appBackground')}
                        ${createUploadHTML('global-bg', '聊天背景', settings.globalChatBg, 'globalChatBg')}
                    </div>`,
                actions: [{ text: '完成', class: 'btn-primary', handler: () => UIManager.hideModal() }]
            });

            const setupUploadHandler = (type, dbKey) => {
                const input = $(`#${type}-input`);
                const preview = $(`#${type}-preview`);
                const removeBtn = $(`#${type}-remove-btn`);
                input.onchange = async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    try {
                        const base64 = await Utils.compressImage(file, 800, 800, 0.7);
                        preview.src = base64;
                        preview.style.display = 'block';
                        removeBtn.style.display = 'inline-block';
                        const settingsToSave = await DBHelper.get('apiConfig', 'themeSettings') || { id: 'themeSettings' };
                        settingsToSave[dbKey] = base64;
                        await DBHelper.put('apiConfig', settingsToSave);
                        if (dbKey === 'appBackground') await EventManager.applyBackgroundSettings();
                        if (dbKey === 'globalChatBg' && appState.currentPage === 'chat' && appState.currentChatId) await UIManager.applyChatBackground(appState.currentChatId);
                        UIManager.showToast('图片已更新');
                    } catch (error) {
                        console.error("图片上传或应用失败:", error);
                        UIManager.showToast('图片处理失败');
                    }
                };
                removeBtn.onclick = async () => {
                    preview.src = '';
                    preview.style.display = 'none';
                    removeBtn.style.display = 'none';
                    input.value = '';
                    const settingsToSave = await DBHelper.get('apiConfig', 'themeSettings') || { id: 'themeSettings' };
                    delete settingsToSave[dbKey];
                    await DBHelper.put('apiConfig', settingsToSave);
                    if (dbKey === 'appBackground') await EventManager.applyBackgroundSettings();
                    if (dbKey === 'globalChatBg' && appState.currentPage === 'chat' && appState.currentChatId) await UIManager.applyChatBackground(appState.currentChatId);
                    UIManager.showToast('图片已移除');
                };
            };
            setupUploadHandler('app-bg', 'appBackground');
            setupUploadHandler('global-bg', 'globalChatBg');
        },

        async handleCoverSettings() {
            const settings = await DBHelper.get('apiConfig', 'themeSettings') || {};
            const createUploadHTML = (type, title, previewSrc, dbKey, previewStyle = '') => `
                <div class="theme-upload-item">
                    <span>${title}</span>
                    <div class="theme-upload-preview-wrapper" style="${previewStyle}">
                        <img src="${previewSrc || ''}" id="${type}-preview" class="theme-upload-preview" style="${previewSrc ? '' : 'display:none;'}">
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <input type="file" id="${type}-input" accept="image/*" style="display: none;">
                        <button class="theme-page-btn" onclick="document.getElementById('${type}-input').click()">上传</button>
                        <button class="theme-page-btn" id="${type}-remove-btn" style="${previewSrc ? '' : 'display:none;'}">移除</button>
                    </div>
                </div>`;

            UIManager.showModal({
                title: '自定义封面',
                body: `
                    <div class="theme-setting-group" style="padding: 10px 0;">
                        ${createUploadHTML('rp-cover', '红包封面', settings.redPacketCover, 'redPacketCover', 'width: 80px; height: 106px;')}
                        ${createUploadHTML('transfer-cover', '转账封面', settings.transferCover, 'transferCover')}
                        ${createUploadHTML('receipt-cover', '收款封面', settings.receiptCover, 'receiptCover')}
                    </div>`,
                actions: [{ text: '完成', class: 'btn-primary', handler: () => UIManager.hideModal() }]
            });

            const setupUploadHandler = (type, dbKey) => {
                const input = $(`#${type}-input`);
                const preview = $(`#${type}-preview`);
                const removeBtn = $(`#${type}-remove-btn`);
                input.onchange = async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    try {
                        const base64 = await Utils.compressImage(file, 800, 800, 0.7);
                        preview.src = base64;
                        preview.style.display = 'block';
                        removeBtn.style.display = 'inline-block';
                        const settingsToSave = await DBHelper.get('apiConfig', 'themeSettings') || { id: 'themeSettings' };
                        settingsToSave[dbKey] = base64;
                        await DBHelper.put('apiConfig', settingsToSave);
                        UIManager.showToast('封面已更新');
                    } catch (error) { UIManager.showToast('图片处理失败'); }
                };
                removeBtn.onclick = async () => {
                    preview.src = '';
                    preview.style.display = 'none';
                    removeBtn.style.display = 'none';
                    input.value = '';
                    const settingsToSave = await DBHelper.get('apiConfig', 'themeSettings') || { id: 'themeSettings' };
                    delete settingsToSave[dbKey];
                    await DBHelper.put('apiConfig', settingsToSave);
                    UIManager.showToast('封面已移除');
                };
            };
            setupUploadHandler('rp-cover', 'redPacketCover');
            setupUploadHandler('transfer-cover', 'transferCover');
            setupUploadHandler('receipt-cover', 'receiptCover');
        },

        async applyBubbleSettings() {
            const settings = await DBHelper.get('apiConfig', 'themeSettings') || {};
            const root = document.documentElement;
            const appContainer = $('#app-container');


            root.style.setProperty('--friend-bubble-bg', settings.friendBubbleBg || '#FFFFFF');
            root.style.setProperty('--player-bubble-bg', settings.playerBubbleBg || 'var(--accent-color)');
            root.style.setProperty('--friend-bubble-text-color', settings.friendBubbleTextColor || '#5D534A');
            root.style.setProperty('--player-bubble-text-color', settings.playerBubbleTextColor || '#FFFFFF');


            const styleKey = settings.bubbleStyle || 'default';
            const classList = Array.from(appContainer.classList);


            let newClassList = classList.filter(c => !c.startsWith('app-bubble-style-'));
            if (classList.includes('bottom-offset-active')) {
                if (!newClassList.includes('bottom-offset-active')) {
                    newClassList.push('bottom-offset-active');
                }
            }


            newClassList.push(`app-bubble-style-${styleKey}`);
            appContainer.className = newClassList.join(' ');
        },

        async applyBubbleFontSize() {
            const settings = await DBHelper.get('apiConfig', 'themeSettings') || {};
            const fontSizeKey = settings.bubbleFontSize || 'default';
            const fontSizes = {
                'small': '0.8rem',
                'normal-small': '0.88rem',
                'default': '0.95rem',
                'normal-large': '1.05rem',
                'large': '1.15rem'
            };
            document.documentElement.style.setProperty('--font-bubble-size', fontSizes[fontSizeKey]);
        },

        async handleFontSettings() {
            const settings = await DBHelper.get('apiConfig', 'themeSettings') || {};
            const fontSettings = settings.fonts || {};
            const customFonts = settings.customFonts || {};

            const builtinFonts = {
                '宋体 (SimSun)': '"SimSun", "宋体", serif',
                '楷体 (LXGW WenKai)': '"LXGW WenKai Screen", "Kaiti", "楷体", serif',
                '龙藏体 (Long Cang)': '"Long Cang", cursive',
                'System Default': `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
            };

            const defaultFontValues = {
                global: builtinFonts['宋体 (SimSun)'],
                bubble: builtinFonts['楷体 (LXGW WenKai)'],
                innervoice: builtinFonts['龙藏体 (Long Cang)'],
                essay: builtinFonts['龙藏体 (Long Cang)']
            };

            const createFontSelectorHTML = (typeKey, typeLabel) => {
                const settingKey = typeKey.toLowerCase();
                const currentSetting = fontSettings[settingKey] || { type: 'builtin', value: defaultFontValues[settingKey] };


                let optionsHTML = Object.entries(builtinFonts).map(([name, value]) =>
                    `<option value='${value}' data-type="builtin" ${currentSetting.type === 'builtin' && currentSetting.value === value ? 'selected' : ''}>${name}</option>`
                ).join('');

                for (const [key, font] of Object.entries(customFonts)) {
                    optionsHTML += `<option value="${key}" data-type="custom" ${currentSetting.type === 'custom' && currentSetting.value === key ? 'selected' : ''}>${font.name} (自定义)</option>`;
                }

                return `
                    <div class="form-group" style="display: flex; justify-content: space-between; align-items: center;">
                        <label>${typeLabel}</label>
                        <select class="font-select" data-font-type="${settingKey}" style="flex-grow: 1; max-width: 60%;">${optionsHTML}</select>
                    </div>`;
            };

            UIManager.showModal({
                title: "字体设置",
                body: `
                    <div class="form-group" style="display: flex; justify-content: space-around; padding-bottom: 15px; border-bottom: 1px dashed var(--border-color);">
                        <button id="font-upload-btn" class="modal-btn btn-secondary" style="padding: 8px 12px; font-size: 0.9rem;">本地</button>
                        <button id="font-url-btn" class="modal-btn btn-secondary" style="padding: 8px 12px; font-size: 0.9rem;">网络</button>
                        <button id="font-delete-btn" class="modal-btn btn-secondary" style="padding: 8px 12px; font-size: 0.9rem;">删除</button>
                    </div>
                    <div style="margin-top: 20px;">
                        ${createFontSelectorHTML('Global', '全局字体')}
                        ${createFontSelectorHTML('Bubble', '气泡字体')}
                        ${createFontSelectorHTML('InnerVoice', '心声字体')}
                        ${createFontSelectorHTML('Essay', '随笔字体')}
                    </div>
                `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '保存', class: 'btn-primary', handler: async () => {
                            const settingsToSave = await DBHelper.get('apiConfig', 'themeSettings') || { id: 'themeSettings' };
                            settingsToSave.fonts = settingsToSave.fonts || {};

                            $$('.font-select').forEach(select => {
                                const fontTypeKey = select.dataset.fontType;
                                const selectedOption = select.options[select.selectedIndex];
                                settingsToSave.fonts[fontTypeKey] = {
                                    type: selectedOption.dataset.type,
                                    value: selectedOption.value
                                };
                            });

                            await DBHelper.put('apiConfig', settingsToSave);
                            await this.applyFontSettings();
                            UIManager.hideModal();
                            UIManager.showToast("字体设置已保存并应用");
                        }
                    }
                ]
            });

            $('#font-upload-btn').onclick = () => this.handleFontUpload(false);
            $('#font-url-btn').onclick = () => this.handleFontUrl(false);
            $('#font-delete-btn').onclick = () => this.handleDeleteCustomFont();
        },

        async handleFontUpload() {
            UIManager.showModal({
                title: "上传本地字体",
                body: `
                        <div style="font-size: 0.9rem; line-height: 1.6;">
                            <p>请选择字体文件进行上传。支持的格式为 <code>.ttf</code>, <code>.otf</code>, <code>.woff</code>, <code>.woff2</code>。</p>
                            <p><strong>强烈推荐使用 <code>.woff2</code> 格式</strong>，因为它的文件体积更小，加载速度更快。</p>
                            <p>请尽量选择体积较小的字体文件，过大的字体会导致刷新页面时加载变慢。(<strong>推荐使用网络链接上传</strong>)</p>
                            <p style="color: var(--text-color-medium); margin-top: 15px;">加载字体需要一些时间，上传后请耐心等待界面刷新。</p>
                        </div>
                    `,
                actions: [
                    {
                        text: '取消', class: 'btn-secondary', handler: () => {
                            UIManager.hideModal();
                            this.handleFontSettings();
                        }
                    },
                    {
                        text: '继续上传', class: 'btn-primary', handler: () => {
                            UIManager.hideModal();
                            this.triggerActualFontUpload();
                        }
                    }
                ]
            });
        },

        triggerActualFontUpload() {
            const fontFileInput = $('#font-file-input');
            fontFileInput.onchange = async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const fontName = file.name.split('.')[0];
                try {
                    const base64 = await Utils.fileToBase64(file);
                    const customFontKey = `${Utils.generateId('font')}`;
                    const settingsToSave = await DBHelper.get('apiConfig', 'themeSettings') || { id: 'themeSettings' };
                    settingsToSave.customFonts = settingsToSave.customFonts || {};
                    settingsToSave.customFonts[customFontKey] = { name: fontName, data: base64 };
                    await DBHelper.put('apiConfig', settingsToSave);


                    await this.loadCustomFontsOnStartup();

                    this.handleFontSettings();
                    UIManager.showToast(`字体 "${fontName}" 上传成功！`);
                } catch (error) {
                    UIManager.showToast("字体文件读取失败");
                } finally {
                    fontFileInput.value = '';
                }
            };
            fontFileInput.click();
        },

        async handleFontUrl() {
            UIManager.showModal({
                title: "添加网络字体",
                body: `
                        <div class="form-group">
                            <label for="font-url-name-input">字体名称 (自定义)</label>
                            <input type="text" id="font-url-name-input" placeholder="例如：思源黑体">
                        </div>
                        <div class="form-group">
                            <label for="font-url-input">字体文件 URL</label>
                            <input type="text" id="font-url-input" placeholder="https://.../font.woff2">
                        </div>
                    `,
                actions: [
                    {
                        text: '取消', class: 'btn-secondary', handler: () => {
                            UIManager.hideModal();
                            this.handleFontSettings();
                        }
                    },
                    {
                        text: '添加', class: 'btn-primary', handler: async () => {
                            const fontName = $('#font-url-name-input').value.trim();
                            const fontUrl = $('#font-url-input').value.trim();
                            if (!fontName || !fontUrl) return UIManager.showToast("名称和URL均不能为空");
                            if (!fontUrl.startsWith('http')) return UIManager.showToast("请输入有效的URL");

                            const customFontKey = `${Utils.generateId('font')}`;
                            const settingsToSave = await DBHelper.get('apiConfig', 'themeSettings') || { id: 'themeSettings' };
                            settingsToSave.customFonts = settingsToSave.customFonts || {};
                            settingsToSave.customFonts[customFontKey] = { name: fontName, data: fontUrl };
                            await DBHelper.put('apiConfig', settingsToSave);


                            await this.loadCustomFontsOnStartup();

                            UIManager.hideModal();
                            this.handleFontSettings();
                            UIManager.showToast(`网络字体 "${fontName}" 添加成功！`);
                        }
                    }
                ]
            });
        },

        async handleDeleteCustomFont() {
            const settings = await DBHelper.get('apiConfig', 'themeSettings') || {};
            const customFonts = settings.customFonts || {};

            if (Object.keys(customFonts).length === 0) {
                return UIManager.showToast("没有可删除的自定义字体");
            }


            const fontListHtml = Object.entries(customFonts).map(([key, font]) => `
                    <label class="member-select-item">
                        <input type="radio" name="delete-font-radio" value="${key}">
                        <span>${font.name}</span>
                    </label>
                `).join('');

            UIManager.showModal({
                title: "选择要删除的字体",
                body: `<div class="member-select-list">${fontListHtml}</div>`,
                actions: [
                    {
                        text: '取消', class: 'btn-secondary', handler: () => {
                            UIManager.hideModal();
                            this.handleFontSettings();
                        }
                    },
                    {
                        text: '删除', class: 'btn-danger', handler: async () => {
                            const selectedRadio = $('input[name="delete-font-radio"]:checked');
                            if (!selectedRadio) return UIManager.showToast("请选择一个要删除的字体");

                            const fontKeyToDelete = selectedRadio.value;
                            const settingsToSave = await DBHelper.get('apiConfig', 'themeSettings') || {};


                            if (settingsToSave.customFonts && settingsToSave.customFonts[fontKeyToDelete]) {
                                delete settingsToSave.customFonts[fontKeyToDelete];
                            }


                            if (settingsToSave.fonts) {
                                for (const typeKey in settingsToSave.fonts) {
                                    if (settingsToSave.fonts[typeKey].value === fontKeyToDelete) {

                                        settingsToSave.fonts[typeKey] = { type: 'builtin', value: '"SimSun", "宋体", serif' };
                                    }
                                }
                            }

                            await DBHelper.put('apiConfig', settingsToSave);


                            await this.loadCustomFontsOnStartup();
                            await this.applyFontSettings();
                            UIManager.hideModal();
                            UIManager.showToast("自定义字体已删除");
                            this.handleFontSettings();
                        }
                    }
                ]
            });
        },

        async loadCustomFontsOnStartup() {

            const settings = await DBHelper.get('apiConfig', 'themeSettings') || {};
            const fontSettings = settings.fonts || {};
            const customFonts = settings.customFonts || {};


            if (Object.keys(customFonts).length === 0) {

                let fontStyleTag = document.getElementById('dynamic-font-styles');
                if (fontStyleTag) fontStyleTag.innerHTML = '';
                return;
            }


            const activeCustomFontKeys = new Set();

            for (const setting of Object.values(fontSettings)) {

                if (setting.type === 'custom' && setting.value) {

                    activeCustomFontKeys.add(setting.value);
                }
            }


            let fontStyleTag = document.getElementById('dynamic-font-styles');
            if (!fontStyleTag) {
                fontStyleTag = document.createElement('style');
                fontStyleTag.id = 'dynamic-font-styles';
                document.head.appendChild(fontStyleTag);
            }


            let fontFaceRules = '';

            for (const key of activeCustomFontKeys) {
                const font = customFonts[key];
                if (font && font.name && font.data) {
                    let src;

                    if (font.data.startsWith('data:')) {
                        src = `url(${font.data})`;
                    } else {
                        src = `url('${font.data}')`;
                    }

                    fontFaceRules += `@font-face { font-family: "${font.name}"; src: ${src}; }\n`;
                }
            }


            fontStyleTag.innerHTML = fontFaceRules;
        },

        async handleFontUrl(fontTypeKey) {
            UIManager.showModal({
                title: "添加网络字体",
                body: `
                        <div class="form-group">
                            <label for="font-url-name-input">字体名称 (自定义)</label>
                            <input type="text" id="font-url-name-input" placeholder="例如：思源黑体">
                        </div>
                        <div class="form-group">
                            <label for="font-url-input">字体文件 URL</label>
                            <input type="text" id="font-url-input" placeholder="https://.../font.woff2">
                        </div>
                        <p style="font-size: 0.8rem; color: var(--text-color-medium); text-align: center; margin-top: 10px;">
                            提示：字体文件越大，加载时间越长，请尽量选择体积较小的字体。
                        </p>
                    `,
                actions: [
                    {
                        text: '取消', class: 'btn-secondary', handler: () => {

                            UIManager.hideModal();
                            this.handleFontSettings();
                        }
                    },
                    {
                        text: '添加', class: 'btn-primary', handler: async () => {
                            const fontName = $('#font-url-name-input').value.trim();
                            const fontUrl = $('#font-url-input').value.trim();

                            if (!fontName || !fontUrl) {
                                return UIManager.showToast("名称和URL均不能为空");
                            }


                            if (!fontUrl.startsWith('http')) {
                                return UIManager.showToast("请输入有效的URL");
                            }

                            const customFontKey = `${Utils.generateId('font')}`;
                            const settingsToSave = await DBHelper.get('apiConfig', 'themeSettings') || { id: 'themeSettings' };
                            settingsToSave.customFonts = settingsToSave.customFonts || {};
                            settingsToSave.fonts = settingsToSave.fonts || {};


                            settingsToSave.customFonts[customFontKey] = { name: fontName, data: fontUrl };
                            settingsToSave.fonts[fontTypeKey] = { type: 'custom', value: customFontKey };

                            await DBHelper.put('apiConfig', settingsToSave);


                            await this.loadCustomFontsOnStartup();
                            await this.applyFontSettings();
                            UIManager.hideModal();

                            this.handleFontSettings();
                        }
                    }
                ]
            });
        },

        async loadCustomFontsOnStartup() {

            const settings = await DBHelper.get('apiConfig', 'themeSettings') || {};
            const fontSettings = settings.fonts || {};
            const customFonts = settings.customFonts || {};


            if (Object.keys(customFonts).length === 0) {

                let fontStyleTag = document.getElementById('dynamic-font-styles');
                if (fontStyleTag) fontStyleTag.innerHTML = '';
                return;
            }


            const activeCustomFontKeys = new Set();

            for (const setting of Object.values(fontSettings)) {

                if (setting.type === 'custom' && setting.value) {

                    activeCustomFontKeys.add(setting.value);
                }
            }


            let fontStyleTag = document.getElementById('dynamic-font-styles');
            if (!fontStyleTag) {
                fontStyleTag = document.createElement('style');
                fontStyleTag.id = 'dynamic-font-styles';
                document.head.appendChild(fontStyleTag);
            }


            let fontFaceRules = '';

            for (const key of activeCustomFontKeys) {
                const font = customFonts[key];
                if (font && font.name && font.data) {
                    let src;

                    if (font.data.startsWith('data:')) {
                        src = `url(${font.data})`;
                    } else {
                        src = `url('${font.data}')`;
                    }

                    fontFaceRules += `@font-face { font-family: "${font.name}"; src: ${src}; }\n`;
                }
            }


            fontStyleTag.innerHTML = fontFaceRules;
        },

        async handleChatBackgroundSettings(chatId, isGroup) {
            const entity = await DBHelper.get(isGroup ? 'groups' : 'contacts', chatId);
            const currentBg = entity.chatBackground || null;

            const createUploadSection = (id, label, previewSrc) => `
                    <div class="background-upload-section">
                        <label>${label}</label>
                        <img src="${previewSrc || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}" 
                             alt="${label}预览" 
                             class="background-preview" 
                             id="${id}-preview"
                             style="${previewSrc ? '' : 'display: none;'}">
                        <input type="file" id="${id}-input" accept="image/*" style="display: none;">
                        <button class="modal-btn btn-secondary" style="padding: 8px 15px;" onclick="document.getElementById('${id}-input').click()">上传</button>
                        <button class="modal-btn btn-danger" style="padding: 8px 15px; ${previewSrc ? '' : 'display: none;'}" id="${id}-remove-btn">移除</button>
                    </div>`;

            UIManager.showModal({
                title: `专属背景 - ${entity.name}`,
                customClass: 'theme-settings-modal',
                body: `
                        <div class="form-group">
                           ${createUploadSection('exclusive-bg', '专属背景', currentBg)}
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '保存',
                        class: 'btn-primary',
                        handler: async () => {
                            const previewSrc = $('#exclusive-bg-preview').src;
                            const blankGif = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';


                            const newBg = (previewSrc.startsWith('data:image') && previewSrc !== blankGif) ? previewSrc : null;

                            entity.chatBackground = newBg;
                            await DBHelper.put(isGroup ? 'groups' : 'contacts', entity);


                            if (appState.currentChatId === chatId) {
                                await UIManager.applyChatBackground(chatId);
                            }

                            UIManager.hideModal();
                            UIManager.showToast('专属背景已保存！');
                        }
                    }
                ]
            });


            const setupUpload = (id) => {
                const input = $(`#${id}-input`);
                const preview = $(`#${id}-preview`);
                const removeBtn = $(`#${id}-remove-btn`);

                input.addEventListener('change', async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        preview.src = await Utils.fileToBase64(file);
                        preview.style.display = 'block';
                        removeBtn.style.display = 'inline-block';
                    }
                });

                removeBtn.addEventListener('click', () => {
                    preview.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
                    preview.style.display = 'none';
                    removeBtn.style.display = 'none';
                    input.value = '';
                });
            };
            setupUpload('exclusive-bg');
        },

        async handleChatSettings() {

            let chatSettings = await DBHelper.get('apiConfig', 'chatSettings');
            const defaults = {
                id: 'chatSettings',
                memoryInterconnection: false,
                historyLength: 20,
                showMyNameInGroup: true,
                showNamesInPrivate: false,
                bottomBarOffset: false,
                enterToSend: false,
                promptTurnFrequency: 1,
                activeReplyInterval: 3,
            };
            if (!chatSettings) {
                chatSettings = defaults;
            } else {

                chatSettings = { ...defaults, ...chatSettings };
            }


            const createSwitch = (id, label, description, isChecked) => `
                    <div class="form-group" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border-color);">
                        <div style="flex-grow: 1;">
                            <label style="margin-bottom: 5px; font-size: 1.1rem;">${label}</label>
                            <p style="font-size: 0.8rem; color: var(--text-color-medium); margin-top: 0; line-height: 1.4;">
                                ${description}
                            </p>
                        </div>
                        <div style="flex-shrink: 0; margin-left: 20px;">
                            <label class="switch">
                                <input type="checkbox" id="${id}" ${isChecked ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                `;


            const createNumberInput = (label, description, displayId, initialValue, unit = '') => `
                    <div class="form-group" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; margin-top: 15px;">
                        <div style="flex-grow: 1;">
                            <label style="margin-bottom: 5px; font-size: 1.1rem;">${label}</label>
                            <p style="font-size: 0.8rem; color: var(--text-color-medium); margin-top: 0; line-height: 1.4;">
                                ${description}
                            </p>
                        </div>
                        <div style="flex-shrink: 0; margin-left: 20px;">
                            <div class="number-input-custom">
                                <button id="${displayId}-minus">-</button>
                                <span id="${displayId}-display">${initialValue}</span>
                                <button id="${displayId}-plus">+</button>
                                ${unit ? `<span style="margin-left: 8px; font-size: 0.9rem; color: var(--text-color-medium);">${unit}</span>` : ''}
                            </div>
                        </div>
                    </div>
                `;



            UIManager.showModal({
                title: '聊天设置',
                body: `
                        <style>.switch{position:relative;display:inline-block;width:52px;height:30px}.switch input{opacity:0;width:0;height:0}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s;border-radius:30px}.slider:before{position:absolute;content:"";height:24px;width:24px;left:3px;bottom:3px;background-color:white;transition:.4s;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,0.2)}input:checked+.slider{background-color:var(--accent-color)}input:checked+.slider:before{transform:translateX(22px)}</style>
                        ${createSwitch('memory-interconnection-switch', '记忆互通', '开启后，好友会获取相关群聊+私聊作为记忆参考，对话更连贯。', chatSettings.memoryInterconnection)}
                        ${createSwitch('show-my-name-in-group-switch', '群聊显示自己名字', '开启后，你在群聊中发送的消息上方会显示你的名字。', chatSettings.showMyNameInGroup)}
                        ${createSwitch('show-names-in-private-switch', '私聊显示名字', '开启后，私聊时双方的消息上方都会显示名字。', chatSettings.showNamesInPrivate)}
                        ${createSwitch('bottom-bar-offset-switch', '底部状态栏上移', '开启后，为手机自带的底部导航条预留空间，防止遮挡。', chatSettings.bottomBarOffset)}
                        ${createSwitch('enter-to-send-switch', '回车自动发送', '开启后，在输入框内按回车键将直接发送消息。', chatSettings.enterToSend)}
                        
                        ${createNumberInput('聊天记录长度', '设定每次请求AI时附带的对话轮数，影响记忆和Token消耗。', 'history-len', chatSettings.historyLength)}
                        ${createNumberInput('提示词发送频率', '每N个玩家回合发送一次包含自定义提示词的完整Prompt，以节省Token。', 'prompt-freq', chatSettings.promptTurnFrequency)}
                        ${createNumberInput('主动回复间隔', '当距离AI上次回复超过N小时后，进入聊天会自动触发AI主动回复。', 'active-reply-interval', chatSettings.activeReplyInterval)}
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '保存', class: 'btn-primary', handler: async () => {
                            const newSettings = {
                                id: 'chatSettings',
                                memoryInterconnection: $('#memory-interconnection-switch').checked,
                                historyLength: parseInt($('#history-len-display').textContent, 10),
                                showMyNameInGroup: $('#show-my-name-in-group-switch').checked,
                                showNamesInPrivate: $('#show-names-in-private-switch').checked,
                                bottomBarOffset: $('#bottom-bar-offset-switch').checked,
                                enterToSend: $('#enter-to-send-switch').checked,
                                promptTurnFrequency: parseInt($('#prompt-freq-display').textContent, 10),
                                activeReplyInterval: parseInt($('#active-reply-interval-display').textContent, 10),
                            };
                            await DBHelper.put('apiConfig', newSettings);
                            this.applyChatSettings(newSettings);
                            UIManager.hideModal();
                        }
                    }
                ]
            });


            const setupNumberInput = (id) => {
                const display = $(`#${id}-display`);
                $(`#${id}-minus`).addEventListener('click', () => {
                    let currentVal = parseInt(display.textContent, 10);
                    if (currentVal > 1) display.textContent = currentVal - 1;
                });
                $(`#${id}-plus`).addEventListener('click', () => {
                    let currentVal = parseInt(display.textContent, 10);
                    display.textContent = currentVal + 1;
                });
            };

            setupNumberInput('history-len');
            setupNumberInput('prompt-freq');
            setupNumberInput('active-reply-interval');
        },

        applyChatSettings(settings) {

            appContainer.classList.toggle('bottom-offset-active', settings.bottomBarOffset);
        },
        async handleApiSettings() {
            await AIHandler.loadApiConfig();
            const config = AIHandler.apiConfig;

            const getApiProviderOptions = () => `
                    <option value="gemini" ${config.provider === 'gemini' ? 'selected' : ''}>Google Gemini</option>
                    <option value="siliconflow" ${config.provider === 'siliconflow' ? 'selected' : ''}>SiliconFlow</option>
                    <option value="paioupu" ${config.provider === 'paioupu' ? 'selected' : ''}>派欧云</option>
                    <option value="volcano" ${config.provider === 'volcano' ? 'selected' : ''}>火山</option>
                    <option value="custom" ${config.provider === 'custom' ? 'selected' : ''}>自定义</option>
                `;

            UIManager.showModal({
                title: 'API 配置',
                body: `
                        <div class="form-group">
                            <label for="api-provider">API提供商</label>
                            <select id="api-provider">${getApiProviderOptions()}</select>
                        </div>
                        <div class="form-group">
                            <label for="api-url">API URL</label>
                            <input type="text" id="api-url" value="${config.url}" placeholder="输入API URL">
                        </div>
                        <div class="form-group">
                            <label for="api-key">API Key</label>
                            <input type="password" id="api-key" value="${config.key}" placeholder="输入API密钥">
                        </div>
                        <div class="form-group">
                            <label for="api-model-select">模型</label>
                            <select id="api-model-select"></select>
                            <input type="text" id="api-model-input" value="${config.model}" placeholder="输入自定义模型名称" style="display:none;">
                        </div>
                        <div class="form-group">
                            <label for="temperature">温度 (0-1)</label>
                            <input type="number" id="temperature" min="0" max="1" step="0.1" value="${config.temperature}">
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '保存', class: 'btn-primary', handler: async () => {
                            const newConfig = {
                                provider: $('#api-provider').value,
                                url: $('#api-url').value.trim(),
                                key: $('#api-key').value.trim(),
                                temperature: parseFloat($('#temperature').value)
                            };

                            if (isNaN(newConfig.temperature) || newConfig.temperature < 0 || newConfig.temperature > 1) {
                                newConfig.temperature = 0.7;
                            }

                            const modelSelect = $('#api-model-select');
                            const modelInput = $('#api-model-input');
                            if (modelInput.style.display !== 'none') {
                                newConfig.model = modelInput.value.trim();
                            } else {
                                newConfig.model = modelSelect.value;
                            }

                            await AIHandler.saveApiConfig(newConfig);
                            UIManager.hideModal();
                            UIManager.showModal({
                                title: "操作成功",
                                body: `<p>API配置已成功保存！<br><br>33祝你游玩愉快⌯>ᴗo⌯ .ᐟ.ᐟ</p>`,
                                actions: [{ text: '好的', class: 'btn-primary', handler: () => UIManager.hideModal() }]
                            });
                        }
                    }
                ]
            });


            const updateApiFields = () => {
                const provider = $('#api-provider').value;
                const apiUrlInput = $('#api-url');
                const modelSelect = $('#api-model-select');
                const modelInput = $('#api-model-input');
                const currentModel = AIHandler.apiConfig.model;

                modelSelect.innerHTML = '';

                const modelOptions = {
                    gemini: [
                        "gemini-2.5-flash", "gemini-2.5-pro", "gemini-1.5-flash-latest", "gemini-1.5-pro-latest"
                    ],
                    siliconflow: [
                        "deepseek-ai/DeepSeek-V3", "Qwen/Qwen2-7B-Instruct", "Qwen/Qwen2-72B-Instruct", "01-ai/Yi-1.5-34B-Chat", "mistralai/Mistral-7B-Instruct-v0.2", "mistralai/Mixtral-8x7B-Instruct-v0.1"
                    ],
                    paioupu: [
                        "deepseek/deepseek-v3"
                    ]
                };

                const setOptions = (options) => {
                    modelSelect.innerHTML = options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
                    modelSelect.value = options.includes(currentModel) ? currentModel : options[0];
                };

                switch (provider) {
                    case 'gemini':
                        apiUrlInput.value = 'https://generativelanguage.googleapis.com/v1beta/models/';
                        modelSelect.style.display = 'block';
                        modelInput.style.display = 'none';
                        setOptions(modelOptions.gemini);
                        break;
                    case 'siliconflow':
                        apiUrlInput.value = 'https://api.siliconflow.cn/v1/chat/completions';
                        modelSelect.style.display = 'block';
                        modelInput.style.display = 'none';
                        setOptions(modelOptions.siliconflow);
                        break;
                    case 'paioupu':
                        apiUrlInput.value = 'https://api.ppinfra.com/v3/openai';
                        modelSelect.style.display = 'block';
                        modelInput.style.display = 'none';
                        setOptions(modelOptions.paioupu);
                        break;
                    case 'volcano':
                        apiUrlInput.value = 'https://ark.cn-beijing.volces.com/api/v3';
                        modelSelect.style.display = 'none';
                        modelInput.style.display = 'block';
                        modelInput.value = currentModel;
                        break;
                    case 'custom':
                        modelSelect.style.display = 'none';
                        modelInput.style.display = 'block';
                        modelInput.value = currentModel;
                        break;
                }
            };

            $('#api-provider').addEventListener('change', updateApiFields);
            updateApiFields();
        },

        async handleForwardMoment(momentId) {
            const chats = await DBHelper.getAll('chats');
            const contacts = await DBHelper.getAll('contacts');
            const groups = await DBHelper.getAll('groups');

            const recentConversations = chats.filter(c => c.history && c.history.length > 0)
                .sort((a, b) => b.history[b.history.length - 1].timestamp - a.history[a.history.length - 1].timestamp);

            if (recentConversations.length === 0) {
                UIManager.showModal({
                    title: "转发动态",
                    body: `<p style="text-align: center; color: #aaa; padding: 20px 0;">最近没有新的聊天会话，<br>去和好友们开启一个聊天窗口吧！</p>`,
                    actions: [{ text: '好的', class: 'btn-primary', handler: () => UIManager.hideModal() }]
                });
                return;
            }

            const conversationDetails = recentConversations.map(chat => {
                let details;
                if (chat.chatId.startsWith('contact-')) {
                    details = contacts.find(c => c.id === chat.chatId);
                } else {
                    details = groups.find(g => g.id === chat.chatId);
                }
                return details ? { ...details, chatId: chat.chatId } : null;
            }).filter(Boolean);

            const chatListHtml = conversationDetails.map(item => `
                    <label class="member-select-item">
                        <input type="radio" name="forward-target" value="${item.chatId}">
                        <img src="${item.avatar}" class="contact-item-avatar" style="width:40px;height:40px;margin-right:10px; border-radius: 8px;">
                        <span>${item.remark || item.name}</span>
                    </label>
                `).join('');

            UIManager.showModal({
                title: "转发给",
                body: `<div class="member-select-list" style="max-height: 40vh;">${chatListHtml}</div>`,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '发送', class: 'btn-primary', handler: async () => {
                            const selectedRadio = $('input[name="forward-target"]:checked');
                            if (!selectedRadio) {
                                UIManager.showToast("请选择一个聊天");
                                return;
                            }
                            const targetChatId = selectedRadio.value;

                            const moment = await DBHelper.get('moments', momentId);
                            const momentAuthor = await this.getMomentAuthor(moment.authorId);

                            const aiContent = await this.buildForwardedMomentAIContent(moment, momentAuthor);

                            const cardData = {
                                momentId: moment.id,
                                authorName: momentAuthor.name,
                                preview: moment.content,
                            };

                            const message = {
                                messageId: Utils.generateId('msg'),
                                content: aiContent,
                                type: 'sent',
                                segmentType: 'moment_forward',
                                cardData: cardData
                            };


                            const originalChatId = appState.currentChatId;
                            appState.currentChatId = targetChatId;
                            await this.handlePlayerSendMessage(message);
                            appState.currentChatId = originalChatId;

                            UIManager.hideModal();
                            UIManager.showToast(`已转发给 ${conversationDetails.find(c => c.chatId === targetChatId).name}`);
                        }
                    }
                ]
            });
        },

        async getMomentAuthor(authorId) {
            const myProfile = await DBHelper.get('profile', 'myProfile');
            if (authorId === myProfile.id) {
                return { name: myProfile.name, avatar: myProfile.avatar };
            }
            const contact = await DBHelper.get('contacts', authorId);
            if (contact) {
                return { name: contact.name, avatar: contact.avatar };
            }
            return { name: authorId, avatar: Utils.createAvatarDataUrl('#ccc') };
        },

        async buildForwardedMomentAIContent(moment, author) {
            const allContacts = await DBHelper.getAll('contacts');
            const myProfile = await DBHelper.get('profile', 'myProfile');

            let commentsText = '无';
            if (moment.comments && moment.comments.length > 0) {
                commentsText = '\n' + moment.comments.map(c => {
                    let cAuthorName = '未知';
                    if (c.authorId === myProfile.id) {
                        cAuthorName = myProfile.name;
                    } else {
                        const contact = allContacts.find(con => con.id === c.authorId);
                        cAuthorName = contact ? contact.name : c.authorId;
                    }
                    const replyText = c.replyTo ? ` 回复 ${c.replyTo}` : '';
                    return `${cAuthorName}${replyText}: ${c.content}`;
                }).join('\n');
            }

            const imageDescription = moment.images && moment.images.length > 0
                ? ` [图片：包含${moment.images.length}张图片的动态]`
                : '';

            return `<转发动态>
动态作者：${author.name}
动态内容：${moment.content}${imageDescription}
动态时间：${Utils.formatTimestampSmartly(moment.timestamp)}
点赞情况：${moment.likes && moment.likes.length > 0 ? moment.likes.join(', ') : '无'}
评论区：${commentsText}
</转发动态>`;
        },

        async showForwardedMomentDetail(momentId) {
            const moment = await DBHelper.get('moments', momentId);
            if (!moment) {
                UIManager.showToast("该动态可能已被删除");
                return;
            }

            const allContacts = await DBHelper.getAll('contacts');
            const myProfile = await DBHelper.get('profile', 'myProfile');
            const author = await this.getMomentAuthor(moment.authorId);

            let likesHtml = '';
            if (moment.likes && moment.likes.length > 0) {
                likesHtml = `<div class="likes-list"><i class="fas fa-heart"></i> ${moment.likes.join(', ')}</div>`;
            }

            let commentsHtml = '';
            if (moment.comments && moment.comments.length > 0) {
                commentsHtml = moment.comments.map(comment => {
                    let cAuthorName = '未知用户';
                    if (comment.authorId === myProfile.id) {
                        cAuthorName = myProfile.name;
                    } else {
                        const contact = allContacts.find(c => c.id === comment.authorId);
                        cAuthorName = contact ? contact.name : comment.authorId;
                    }

                    const replyHtml = comment.replyTo
                        ? `<span class="comment-reply-to"> 回复 </span><span class="comment-author">${comment.replyTo}</span>`
                        : '';
                    return `<div class="comment-item"><span class="comment-author">${cAuthorName}</span>${replyHtml}: ${comment.content}</div>`;
                }).join('');
            }

            const imagesHtml = moment.images && moment.images.length > 0
                ? `<div class="post-image-grid">${moment.images.map(src => `<img src="${src}" alt="动态图片">`).join('')}</div>`
                : '';

            const modalBody = `
                    <div class="moment-detail-wrapper">
                        <div class="post-header">
                            <img src="${author.avatar}" alt="${author.name} 头像" class="post-avatar">
                            <div class="post-author-info">
                                <span class="name">${author.name}</span>
                            </div>
                        </div>
                        <div class="post-content-full">${moment.content}</div>
                        ${imagesHtml}
                        <div class="post-footer-full">
                            <span class="timestamp">${Utils.formatTimestampSmartly(moment.timestamp)}</span>
                        </div>
                        ${(likesHtml || commentsHtml) ? `
                        <div class="interactions-section">
                            ${likesHtml}
                            <div class="comments-list">${commentsHtml}</div>
                        </div>
                        ` : ''}
                    </div>
                `;

            UIManager.showModal({
                title: "朋友圈动态",
                body: modalBody,
                actions: [{ text: '关闭', class: 'btn-primary', handler: () => UIManager.hideModal() }]
            });
        },

        handleClickEffect(e) {
            const pos = appContainer.getBoundingClientRect();
            const x = e.clientX - pos.left;
            const y = e.clientY - pos.top;


            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            clickEffectLayer.appendChild(ripple);

            const rippleSize = 80;
            ripple.style.width = ripple.style.height = `${rippleSize}px`;
            ripple.style.left = `${x - rippleSize / 2}px`;
            ripple.style.top = `${y - rippleSize / 2}px`;
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });


            for (let i = 0; i < 2; i++) {
                const heart = document.createElement('i');
                heart.className = 'fas fa-heart heart';
                clickEffectLayer.appendChild(heart);

                heart.style.left = `${x}px`;
                heart.style.top = `${y}px`;

                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 30 + 10;
                const tx = Math.cos(angle) * distance;
                const ty = (Math.sin(angle) * distance) - 50;

                heart.style.setProperty('--tx', `${tx}px`);
                heart.style.setProperty('--ty', `${ty}px`);
                heart.style.animationDelay = `${Math.random() * 0.2}s`;
                heart.addEventListener('animationend', () => {
                    heart.remove();
                });
            }
        },

        async handleOpenGroupManagementSidebar(groupId) {
            const group = await DBHelper.get('groups', groupId);
            if (group) {
                UIManager.showGroupManagementSidebar(group);
            }
        },

        async handleOpenFriendManagementSidebar(contactId) {
            const contact = await DBHelper.get('contacts', contactId);
            if (contact) {
                UIManager.showFriendManagementSidebar(contact);
            }
        },

        async showEditFriendModal(contactId, onSaveCallback = null) {
            const contact = await DBHelper.get('contacts', contactId);
            if (!contact) return;

            UIManager.showModal({
                isPersistent: true,
                title: "修改好友信息",
                body: `
                        <div class="form-group">
                            <label>头像</label>
                            <div class="avatar-uploader">
                                <img src="${contact.avatar}" id="edit-friend-avatar-preview" class="avatar-preview">
                                <input type="file" id="edit-friend-avatar-input" accept="image/*" style="display:none;">
                                <button class="upload-btn" onclick="document.getElementById('edit-friend-avatar-input').click()">上传新头像</button>
                            </div>
                        </div>
                        <div class="form-group"><label>姓名 (ID, 不可修改)</label><input type="text" value="${contact.name}" disabled></div>
                        <div class="form-group"><label for="edit-friend-remark">备注</label><input type="text" id="edit-friend-remark" value="${contact.remark || ''}"></div>
                        <div class="form-group"><label for="edit-friend-gender">性别</label><select id="edit-friend-gender"><option value="男" ${contact.gender === '男' ? 'selected' : ''}>男</option><option value="女" ${contact.gender === '女' ? 'selected' : ''}>女</option><option value="其他" ${contact.gender === '其他' ? 'selected' : ''}>其他</option></select></div>
                        <div class="form-group"><label for="edit-friend-likes">喜好</label><textarea id="edit-friend-likes">${contact.likes || ''}</textarea></div>
                        <div class="form-group"><label for="edit-friend-dislikes">厌恶</label><textarea id="edit-friend-dislikes">${contact.dislikes || ''}</textarea></div>
                        <div class="form-group"><label for="edit-friend-habits">习惯</label><textarea id="edit-friend-habits">${contact.habits || ''}</textarea></div>
                        <div class="form-group"><label for="edit-friend-background">背景资料</label><textarea id="edit-friend-background">${contact.background || ''}</textarea></div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '保存', class: 'btn-primary', handler: async () => {
                            const updatedContact = {
                                ...contact,
                                avatar: $('#edit-friend-avatar-preview').src,
                                remark: $('#edit-friend-remark').value.trim(),
                                gender: $('#edit-friend-gender').value,
                                likes: $('#edit-friend-likes').value.trim(),
                                dislikes: $('#edit-friend-dislikes').value.trim(),
                                habits: $('#edit-friend-habits').value.trim(),
                                background: $('#edit-friend-background').value.trim()
                            };
                            await DBHelper.put('contacts', updatedContact);
                            chatTitle.textContent = updatedContact.remark || updatedContact.name;
                            UIManager.hideModal();

                            if (typeof onSaveCallback === 'function') {
                                onSaveCallback(updatedContact);
                            } else {
                                UIManager.showFriendManagementSidebar(updatedContact);
                            }
                        }
                    }
                ]
            });

            $('#edit-friend-avatar-input').addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) $('#edit-friend-avatar-preview').src = await Utils.fileToBase64(file);
            });
        },
        async importOpeningScenes(scenes, newEntityId, isGroup) {
            if (!scenes || !Array.isArray(scenes) || scenes.length === 0) return;
            for (const scene of scenes) {
                const newScene = { ...scene, id: Utils.generateId('scene') };
                if (isGroup) {
                    newScene.groupId = newEntityId;
                    delete newScene.contactId;
                } else {
                    newScene.contactId = newEntityId;
                    delete newScene.groupId;
                }
                await DBHelper.put('openingScenes', newScene);
            }
        },
        handleOpeningSceneSettings(entityId, isGroup) {
            UIManager.showOpeningSceneModal(entityId, isGroup);
        },


        handleNewOpeningScene(entityId, isGroup) {
            UIManager.showModal({
                isPersistent: true,
                title: "新建开场白",
                body: `
                        <div class="form-group">
                            <label for="scene-name">开场白名称</label>
                            <input type="text" id="scene-name" placeholder="例如：初次见面的问候">
                        </div>
                        <div class="form-group">
                            <label for="scene-content">开场白内容</label>
                            <textarea id="scene-content" rows="6" placeholder="详细描述开场时的情景、角色的状态和第一句对话等..."></textarea>
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.showOpeningSceneModal(entityId, isGroup) },
                    {
                        text: '保存', class: 'btn-primary', handler: async () => {
                            const name = $('#scene-name').value.trim();
                            const content = $('#scene-content').value.trim();
                            if (!name || !content) return;
                            const newScene = { id: Utils.generateId('scene'), name, content };
                            if (isGroup) {
                                newScene.groupId = entityId;
                            } else {
                                newScene.contactId = entityId;
                            }
                            await DBHelper.put('openingScenes', newScene);
                            UIManager.showOpeningSceneModal(entityId, isGroup);
                        }
                    }
                ]
            });
        },

        handleEditOpeningScene(scene, isGroup) {
            UIManager.showModal({
                isPersistent: true,
                title: "编辑开场白",
                body: `
                        <div class="form-group">
                            <label for="scene-name">开场白名称</label>
                            <input type="text" id="scene-name" value="${scene.name}">
                        </div>
                        <div class="form-group">
                            <label for="scene-content">开场白内容</label>
                            <textarea id="scene-content" rows="6">${scene.content}</textarea>
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.showOpeningSceneModal(isGroup ? scene.groupId : scene.contactId, isGroup) },
                    {
                        text: '保存', class: 'btn-primary', handler: async () => {
                            const updatedScene = {
                                ...scene,
                                name: $('#scene-name').value.trim(),
                                content: $('#scene-content').value.trim()
                            };
                            await DBHelper.put('openingScenes', updatedScene);
                            UIManager.showOpeningSceneModal(isGroup ? scene.groupId : scene.contactId, isGroup);
                        }
                    }
                ]
            });
        },

        handleDeleteOpeningScene(sceneId, entityId, isGroup) {
            UIManager.showModal({
                title: "确认删除",
                body: `<p>确定要删除这个开场白吗？此操作无法恢复。</p>`,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.showOpeningSceneModal(entityId, isGroup) },
                    {
                        text: '删除', class: 'btn-danger', handler: async () => {
                            await DBHelper.delete('openingScenes', sceneId);
                            UIManager.showOpeningSceneModal(entityId, isGroup);
                        }
                    }
                ]
            });
        },

        handleApplyOpeningScene(scene) {
            UIManager.showModal({
                title: "应用开场白",
                body: `<p>应用开场白将会清空当前聊天记录，并由AI根据开场白内容开始新的对话。确定要继续吗？</p>`,
                actions: [
                    {
                        text: '取消', class: 'btn-secondary', handler: () => {
                            const isGroup = !!scene.groupId;
                            UIManager.showOpeningSceneModal(isGroup ? scene.groupId : scene.contactId, isGroup);
                        }
                    },
                    {
                        text: '确定应用', class: 'btn-primary', handler: async () => {
                            const chatId = scene.groupId || scene.contactId;

                            UIManager.hideSidebar();
                            UIManager.hideModal();


                            const chatData = await DBHelper.get('chats', chatId) || { chatId: chatId, history: [] };
                            chatData.history = [];
                            await DBHelper.put('chats', chatData);


                            if (appState.currentChatId === chatId) {
                                await UIManager.refreshChatView();
                            }


                            await AIHandler.handleOpeningSceneRequest(scene);
                        }
                    }
                ]
            });
        },

        async handleTransferClick(msg) {
            const myProfile = await DBHelper.get('profile', 'myProfile');
            let senderContact;


            if (msg.type === 'sent') {

                senderContact = myProfile;
            } else {

                senderContact = await DBHelper.get('contacts', msg.senderId);
            }


            if (!senderContact) {
                console.error("无法找到转账发送方信息:", msg);
                UIManager.showToast("无法加载转账详情，发送方信息丢失。");
                return;
            }

            const isRecipientPlayer = msg.cardData.recipientName === myProfile.name;

            UIManager.showModal({
                title: "转账详情",
                body: `
                        <div style="text-align: center;">
                            <img src="${senderContact.avatar}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-bottom: 10px;">
                            <h4 style="margin-bottom: 5px;">来自 ${senderContact.remark || senderContact.name} 的转账</h4>
                            <p style="font-size: 2rem; font-weight: bold; margin: 15px 0;">${msg.cardData.amount}</p>
                            ${msg.cardData.note ? `<p style="color: #888;">备注：${msg.cardData.note}</p>` : ''}
                        </div>
                    `,
                actions: [
                    { text: '关闭', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '收款',
                        class: `btn-primary`,
                        handler: async () => {

                            if (!isRecipientPlayer) {
                                UIManager.showToast('你不是该转账的收款对象');
                                return;
                            }


                            const chatData = await DBHelper.get('chats', appState.currentChatId);
                            const msgToUpdate = chatData.history.find(m => m.messageId === msg.messageId);
                            if (msgToUpdate) {
                                msgToUpdate.cardData.isClaimed = true;
                            }

                            const receiptMsg = {
                                messageId: Utils.generateId('msg'),
                                timestamp: Date.now(),
                                type: 'sent',
                                segmentType: 'transfer-receipt',
                                content: `${myProfile.name}已收款`,
                                cardData: {
                                    recipientName: myProfile.name,
                                    senderName: senderContact.name,
                                    amount: msg.cardData.amount
                                }
                            };
                            chatData.history.push(receiptMsg);
                            await DBHelper.put('chats', chatData);


                            const originalBubble = $(`#${msg.messageId} .bubble`);
                            if (originalBubble) originalBubble.classList.add('claimed');
                            UIManager.addMessageToDOM(receiptMsg, myProfile);
                            UIManager.hideModal();
                        }
                    }
                ]
            });
        },

        async handleRedPacketClick(msg) {
            const myProfile = await DBHelper.get('profile', 'myProfile');
            let senderContact;


            if (msg.type === 'sent') {

                senderContact = myProfile;
            } else {

                senderContact = await DBHelper.get('contacts', msg.senderId);
            }


            if (!senderContact) {
                console.error("无法找到红包发送方信息:", msg);
                UIManager.showToast("无法加载红包详情，发送方信息丢失。");
                return;
            }


            const modalStyle = `
                    <style>
                        .rp-modal-body { text-align: center; padding: 20px 0; }
                        .rp-modal-body img { width: 60px; height: 60px; border-radius: 8px; margin-bottom: 10px; }
                        .rp-modal-body h4 { font-size: 1.2rem; margin-bottom: 5px; }
                        .rp-modal-body p { color: var(--text-color-light); margin-bottom: 30px; }
                        .rp-open-btn {
                            width: 80px; height: 80px; border-radius: 50%;
                            background-color: #F8C34A; color: white;
                            border: 3px solid #F5A623; font-size: 2rem;
                            cursor: pointer; animation: rp-pulse 1.5s infinite;
                            box-shadow: 0 4px 10px rgba(248, 195, 74, 0.5);
                        }
                        @keyframes rp-pulse { 0% { transform: scale(0.95); } 70% { transform: scale(1.05); } 100% { transform: scale(0.95); } }
                        .rp-amount { font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; }
                        .rp-claimed-info { font-size: 0.9rem; color: var(--text-color-medium); }
                    </style>
                `;


            UIManager.showModal({
                title: " ",
                body: `
                        ${modalStyle}
                        <div class="rp-modal-body" id="rp-pre-claim">
                            <img src="${senderContact.avatar}" alt="avatar">
                            <h4>${senderContact.remark || senderContact.name} 的红包</h4>
                            <p>${msg.cardData.title}</p>
                            <button class="rp-open-btn">开</button>
                        </div>
                    `,
                actions: [{ text: '关闭', class: 'btn-secondary', handler: () => UIManager.hideModal() }]
            });


            modalContentWrapper.querySelector('.rp-open-btn').onclick = async () => {



                if (msg.type === 'sent') {
                    UIManager.showToast("不能领取自己发的红包哦");
                    return;
                }

                const isGroupChat = appState.currentChatId.startsWith('group-');
                let receivedAmount = 0;

                if (isGroupChat) {

                    if (msg.cardData.count === 1) {
                        receivedAmount = msg.cardData.amount;
                    } else {

                        const remainingAmount = msg.cardData.amount;
                        const remainingCount = msg.cardData.count - msg.cardData.claimedBy.length;
                        const maxReceive = remainingAmount - (remainingCount - 1) * 0.01;
                        receivedAmount = Math.random() * (maxReceive - 0.01) + 0.01;
                    }
                } else {
                    receivedAmount = msg.cardData.amount;
                }


                const chatData = await DBHelper.get('chats', appState.currentChatId);
                const msgToUpdate = chatData.history.find(m => m.messageId === msg.messageId);
                if (msgToUpdate) {
                    msgToUpdate.cardData.isClaimedByPlayer = true;
                    msgToUpdate.cardData.claimedBy.push(myProfile.id);
                }
                await DBHelper.put('chats', chatData);


                const originalBubble = $(`#${msg.messageId} .bubble`);
                if (originalBubble) originalBubble.classList.add('claimed');


                const notice = document.createElement('div');
                notice.className = 'time-divider';
                notice.textContent = `${myProfile.name} 领取了 ${senderContact.remark || senderContact.name} 的红包`;
                chatArea.appendChild(notice);
                chatArea.scrollTop = chatArea.scrollHeight;


                const modalBody = modalContentWrapper.querySelector('.modal-body');
                modalBody.innerHTML = `
                        ${modalStyle}
                        <div class="rp-modal-body" id="rp-post-claim">
                            <p class="rp-amount">￥${receivedAmount.toFixed(2)}</p>
                            <p class="rp-claimed-info">已存入零钱，可直接使用</p>
                        </div>
                    `;
            };
        },

        async handleInviteMembers(groupId) {
            const group = await DBHelper.get('groups', groupId);
            const allContacts = await DBHelper.getAll('contacts');

            const availableFriends = allContacts.filter(c => !group.members.includes(c.id));

            if (availableFriends.length === 0) {
                UIManager.showModal({
                    title: "邀请成员",
                    body: `<p>没有可邀请的好友了，所有好友都已在群聊中。</p>`,
                    actions: [{ text: '好的', class: 'btn-primary', handler: () => UIManager.hideModal() }]
                });
                return;
            }

            const memberListHtml = availableFriends.map(f => `
                    <label class="member-select-item">
                        <input type="checkbox" name="invite-members" value="${f.id}">
                        <img src="${f.avatar}" class="contact-item-avatar" style="width:30px;height:30px;margin-right:10px;">
                        <span>${f.remark || f.name}</span>
                    </label>
                `).join('');

            UIManager.showModal({
                title: "邀请新成员",
                body: `<div class="member-select-list">${memberListHtml}</div>`,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '邀请', class: 'btn-primary', handler: async () => {
                            const newMemberIds = [...$$('input[name="invite-members"]:checked')].map(cb => cb.value);
                            if (newMemberIds.length === 0) return;

                            const myProfile = await DBHelper.get('profile', 'myProfile');
                            const invitedNames = (await Promise.all(newMemberIds.map(id => DBHelper.get('contacts', id)))).map(c => c.remark || c.name).join('、');


                            group.members.push(...newMemberIds);
                            await DBHelper.put('groups', group);


                            const systemMessage = {
                                messageId: Utils.generateId('msg'),
                                content: `${myProfile.name} 邀请 ${invitedNames} 加入群聊`,
                                timestamp: Date.now(),
                                type: 'received',
                                segmentType: 'system',
                                forAi: true,
                            };


                            const chatData = await DBHelper.get('chats', groupId) || { chatId: groupId, history: [] };
                            chatData.history.push(systemMessage);
                            await DBHelper.put('chats', chatData);

                            if (appState.currentChatId === groupId) {
                                await UIManager.refreshChatView();
                            }
                            UIManager.hideModal();
                        }
                    }
                ]
            });
        },

        async handleRemoveMembers(groupId) {
            const group = await DBHelper.get('groups', groupId);
            const allContacts = await DBHelper.getAll('contacts');

            const currentAiMembers = group.members.map(id => allContacts.find(c => c.id === id)).filter(Boolean);

            if (currentAiMembers.length <= 1) {
                UIManager.showModal({
                    title: "移除成员",
                    body: `<p>群聊中至少需要保留一名好友，无法再移除了。</p>`,
                    actions: [{ text: '好的', class: 'btn-primary', handler: () => UIManager.hideModal() }]
                });
                return;
            }

            const memberListHtml = currentAiMembers.map(f => `
                    <label class="member-select-item">
                        <input type="checkbox" name="remove-members" value="${f.id}">
                        <img src="${f.avatar}" class="contact-item-avatar" style="width:30px;height:30px;margin-right:10px;">
                        <span>${f.remark || f.name}</span>
                    </label>
                `).join('');

            UIManager.showModal({
                title: "移除群成员",
                body: `<div class="member-select-list">${memberListHtml}</div>`,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '移除', class: 'btn-danger', handler: async () => {
                            const idsToRemove = [...$$('input[name="remove-members"]:checked')].map(cb => cb.value);
                            if (idsToRemove.length === 0) return;

                            if (idsToRemove.length >= currentAiMembers.length) {
                                UIManager.showModal({ title: "操作无效", body: `<p>不能将所有好友都移出群聊，至少要保留一位哦。</p>`, actions: [{ text: '好的', class: 'btn-primary', handler: () => this.handleRemoveMembers(groupId) }] });
                                return;
                            }

                            const myProfile = await DBHelper.get('profile', 'myProfile');
                            const removedNames = currentAiMembers.filter(c => idsToRemove.includes(c.id)).map(c => c.remark || c.name).join('、');


                            group.members = group.members.filter(id => !idsToRemove.includes(id));
                            await DBHelper.put('groups', group);


                            const systemMessage = {
                                messageId: Utils.generateId('msg'),
                                content: `${myProfile.name} 将 ${removedNames} 移出群聊`,
                                timestamp: Date.now(),
                                type: 'received',
                                segmentType: 'system',
                                forAi: true,
                            };


                            const chatData = await DBHelper.get('chats', groupId) || { chatId: groupId, history: [] };
                            chatData.history.push(systemMessage);
                            await DBHelper.put('chats', chatData);

                            if (appState.currentChatId === groupId) {
                                await UIManager.refreshChatView();
                            }
                            UIManager.hideModal();
                        }
                    }
                ]
            });
        },



        async renderPromptsPage() {
            const contentArea = $('#prompts-page-content');
            contentArea.innerHTML = '';
            const folders = await DBHelper.getAll('promptFolders');
            const prompts = await DBHelper.getAll('prompts');


            let unclassifiedFolder = folders.find(f => f.id === 'unclassified');
            if (!unclassifiedFolder) {
                unclassifiedFolder = { id: 'unclassified', name: '未分类', isActive: true, createdAt: 0 };

            }

            const sortedFolders = [unclassifiedFolder, ...folders.filter(f => f.id !== 'unclassified').sort((a, b) => a.createdAt - b.createdAt)];

            for (const folder of sortedFolders) {
                const folderPrompts = prompts.filter(p => p.folderId === folder.id).sort((a, b) => a.createdAt - b.createdAt);
                const folderElement = this.createFolderElement(folder, folderPrompts);
                contentArea.appendChild(folderElement);
            }

            this.bindPromptPageEvents();
        },

        createFolderElement(folder, prompts) {
            const folderDiv = document.createElement('div');
            folderDiv.className = 'prompt-folder';
            folderDiv.dataset.folderId = folder.id;

            let promptsHtml = prompts.map((p, index) => this.createPromptCardHtml(p, index + 1)).join('');
            if (prompts.length === 0) {
                promptsHtml = `<p style="color: #aaa; text-align: center; grid-column: 1 / -1; padding: 15px 0;">此文件夹为空</p>`;
            }


            folderDiv.innerHTML = `
                    <div class="prompt-folder-header collapsed">
                        <h3>
                            <i class="fas fa-chevron-right folder-toggle-icon"></i>
                            <i class="fas fa-folder"></i> 
                            ${folder.name}
                        </h3>
                        <div class="prompt-folder-controls">
                            ${folder.id !== 'unclassified' ? `
                            <label class="switch">
                                <input type="checkbox" class="folder-toggle-switch" ${folder.isActive ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                            <button class="folder-action-btn" data-action="delete-folder" title="删除文件夹"><i class="fas fa-trash-alt"></i></button>
                            ` : ''}
                        </div>
                    </div>
                    <div class="prompt-folder-content collapsed">${promptsHtml}</div>
                `;
            return folderDiv;
        },

        createPromptCardHtml(prompt, index) {
            let keywordsText = '';
            if (prompt.type === 'implicit') {
                try {
                    const keywords = JSON.parse(prompt.keywords);
                    keywordsText = `<div class="prompt-tag tag-keywords" title="${keywords.join(', ')}">${keywords.join(', ')}</div>`;
                } catch (e) { }
            }

            return `
                    <div class="prompt-card ${prompt.isActive ? '' : 'inactive'}" data-prompt-id="${prompt.id}">
                        <div class="prompt-card-header">
                            <div class="prompt-card-name">
                                <span class="prompt-index">${index}</span>
                                <span>${prompt.name}</span>
                            </div>
                             <label class="switch">
                                <input type="checkbox" class="prompt-toggle-switch" ${prompt.isActive ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="prompt-card-tags">
                            <div class="prompt-tag ${prompt.type === 'explicit' ? 'tag-explicit' : 'tag-implicit'}">${prompt.type === 'explicit' ? '显性' : '隐性'}</div>
                            ${keywordsText}
                        </div>
                        <div class="prompt-card-actions">
                            <button class="action-btn" data-action="view-prompt">查看</button>
                            <button class="action-btn" data-action="edit-prompt">修改</button>
                            <button class="action-btn" data-action="delete-prompt">删除</button>
                        </div>
                    </div>
                `;
        },

        bindPromptPageEvents() {

            $('#prompts-back-btn').onclick = () => UIManager.navigateTo('settings');
            $('#add-prompt-folder-btn').onclick = () => this.handleNewPromptFolder();
            $('#add-new-prompt-btn').onclick = () => this.handleNewPrompt();

            $('#import-prompts-btn').onclick = () => this.handleImportPrompts();
            $('#export-prompts-btn').onclick = () => this.handleExportPrompts();


            $('#prompts-page-content').onclick = async (e) => {
                const target = e.target;
                const folderHeader = target.closest('.prompt-folder-header');
                const folderSwitch = target.closest('.folder-toggle-switch');
                const deleteFolderBtn = target.closest('[data-action="delete-folder"]');
                const promptCard = target.closest('.prompt-card');

                if (folderSwitch) {

                    e.stopPropagation();
                    const folderId = folderSwitch.closest('.prompt-folder').dataset.folderId;
                    await this.toggleFolderState(folderId, folderSwitch.checked);
                } else if (deleteFolderBtn) {

                    e.stopPropagation();
                    const folderId = deleteFolderBtn.closest('.prompt-folder').dataset.folderId;
                    this.confirmDeleteFolder(folderId);
                } else if (folderHeader) {

                    const content = folderHeader.nextElementSibling;
                    if (content && content.classList.contains('prompt-folder-content')) {
                        folderHeader.classList.toggle('collapsed');
                        content.classList.toggle('collapsed');
                    }
                } else if (promptCard) {

                    const promptId = promptCard.dataset.promptId;
                    if (target.matches('.prompt-toggle-switch')) {
                        await this.togglePromptState(promptId, target.checked);
                    } else if (target.matches('[data-action="view-prompt"]')) {
                        this.viewPrompt(promptId);
                    } else if (target.matches('[data-action="edit-prompt"]')) {
                        this.handleEditPrompt(promptId);
                    } else if (target.matches('[data-action="delete-prompt"]')) {
                        this.confirmDeletePrompt(promptId);
                    }
                }
            };
        },



        async renderPromptsPage() {
            const contentArea = $('#prompts-page-content');
            contentArea.innerHTML = '';
            const folders = await DBHelper.getAll('promptFolders');
            const prompts = await DBHelper.getAll('prompts');


            let unclassifiedFolder = folders.find(f => f.id === 'unclassified');
            if (!unclassifiedFolder) {
                unclassifiedFolder = { id: 'unclassified', name: '未分类', isActive: true, createdAt: 0 };

            }

            const sortedFolders = [unclassifiedFolder, ...folders.filter(f => f.id !== 'unclassified').sort((a, b) => a.createdAt - b.createdAt)];

            for (const folder of sortedFolders) {
                const folderPrompts = prompts.filter(p => p.folderId === folder.id).sort((a, b) => a.createdAt - b.createdAt);
                const folderElement = this.createFolderElement(folder, folderPrompts);
                contentArea.appendChild(folderElement);
            }

            this.bindPromptPageEvents();
        },

        createFolderElement(folder, prompts) {
            const folderDiv = document.createElement('div');
            folderDiv.className = 'prompt-folder';
            folderDiv.dataset.folderId = folder.id;

            let promptsHtml = prompts.map((p, index) => this.createPromptCardHtml(p, index + 1)).join('');
            if (prompts.length === 0) {
                promptsHtml = `<p style="color: #aaa; text-align: center; grid-column: 1 / -1; padding: 15px 0;">此文件夹为空</p>`;
            }


            folderDiv.innerHTML = `
                    <div class="prompt-folder-header collapsed">
                        <h3>
                            <i class="fas fa-chevron-right folder-toggle-icon"></i>
                            <i class="fas fa-folder"></i> 
                            ${folder.name}
                        </h3>
                        <div class="prompt-folder-controls">
                            ${folder.id !== 'unclassified' ? `
                            <label class="switch">
                                <input type="checkbox" class="folder-toggle-switch" ${folder.isActive ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                            <button class="folder-action-btn" data-action="delete-folder" title="删除文件夹"><i class="fas fa-trash-alt"></i></button>
                            ` : ''}
                        </div>
                    </div>
                    <div class="prompt-folder-content collapsed">${promptsHtml}</div>
                `;
            return folderDiv;
        },

        createPromptCardHtml(prompt, index) {
            let keywordsText = '';
            if (prompt.type === 'implicit') {
                try {
                    const keywords = JSON.parse(prompt.keywords);
                    keywordsText = `<div class="prompt-tag tag-keywords" title="${keywords.join(', ')}">${keywords.join(', ')}</div>`;
                } catch (e) { }
            }

            return `
                    <div class="prompt-card ${prompt.isActive ? '' : 'inactive'}" data-prompt-id="${prompt.id}">
                        <div class="prompt-card-header">
                            <div class="prompt-card-name">
                                <span class="prompt-index">${index}</span>
                                <span>${prompt.name}</span>
                            </div>
                             <label class="switch">
                                <input type="checkbox" class="prompt-toggle-switch" ${prompt.isActive ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="prompt-card-tags">
                            <div class="prompt-tag ${prompt.type === 'explicit' ? 'tag-explicit' : 'tag-implicit'}">${prompt.type === 'explicit' ? '显性' : '隐性'}</div>
                            ${keywordsText}
                        </div>
                        <div class="prompt-card-actions">
                            <button class="action-btn" data-action="view-prompt">查看</button>
                            <button class="action-btn" data-action="edit-prompt">修改</button>
                            <button class="action-btn" data-action="delete-prompt">删除</button>
                        </div>
                    </div>
                `;
        },

        bindPromptPageEvents() {

            $('#prompts-back-btn').onclick = () => UIManager.navigateTo('settings');
            $('#add-prompt-folder-btn').onclick = () => this.handleNewPromptFolder();
            $('#add-new-prompt-btn').onclick = () => this.handleNewPrompt();

            $('#import-prompts-btn').onclick = () => this.handleImportPrompts();
            $('#export-prompts-btn').onclick = () => this.handleExportPrompts();


            $('#prompts-page-content').onclick = async (e) => {
                const target = e.target;
                const folderHeader = target.closest('.prompt-folder-header');
                const folderSwitch = target.closest('.folder-toggle-switch');
                const deleteFolderBtn = target.closest('[data-action="delete-folder"]');
                const promptCard = target.closest('.prompt-card');

                if (folderSwitch) {

                    e.stopPropagation();
                    const folderId = folderSwitch.closest('.prompt-folder').dataset.folderId;
                    await this.toggleFolderState(folderId, folderSwitch.checked);
                } else if (deleteFolderBtn) {

                    e.stopPropagation();
                    const folderId = deleteFolderBtn.closest('.prompt-folder').dataset.folderId;
                    this.confirmDeleteFolder(folderId);
                } else if (folderHeader) {

                    const content = folderHeader.nextElementSibling;
                    if (content && content.classList.contains('prompt-folder-content')) {
                        folderHeader.classList.toggle('collapsed');
                        content.classList.toggle('collapsed');
                    }
                } else if (promptCard) {

                    const promptId = promptCard.dataset.promptId;
                    if (target.matches('.prompt-toggle-switch')) {
                        await this.togglePromptState(promptId, target.checked);
                    } else if (target.matches('[data-action="view-prompt"]')) {
                        this.viewPrompt(promptId);
                    } else if (target.matches('[data-action="edit-prompt"]')) {
                        this.handleEditPrompt(promptId);
                    } else if (target.matches('[data-action="delete-prompt"]')) {
                        this.confirmDeletePrompt(promptId);
                    }
                }
            };
        },


        async handleNewPrompt(folderId = 'unclassified') {
            const folders = await DBHelper.getAll('promptFolders');
            const folderOptions = `<option value="unclassified" ${folderId === 'unclassified' ? 'selected' : ''}>未分类</option>` +
                folders.map(f => `<option value="${f.id}" ${folderId === f.id ? 'selected' : ''}>${f.name}</option>`).join('');

            UIManager.showModal({
                isPersistent: true,
                title: "新建提示词",
                body: `
                        <div class="form-group">
                            <label for="prompt-name-input">名称 (文件夹内唯一)</label>
                            <input type="text" id="prompt-name-input" placeholder="例如：文风-古风">
                        </div>
                        <div class="form-group">
                            <label for="prompt-folder-select">所属文件夹</label>
                            <select id="prompt-folder-select">${folderOptions}</select>
                        </div>
                        <div class="form-group">
                            <label>类型</label>
                            <select id="prompt-type-select">
                                <option value="explicit">显性 (总是触发)</option>
                                <option value="implicit">隐性 (关键词触发)</option>
                            </select>
                        </div>
                        <div class="form-group" id="prompt-keywords-group" style="display:none;">
                            <label for="prompt-keywords-input">关键词 (用中/英文逗号隔开)</label>
                            <input type="text" id="prompt-keywords-input" placeholder="例如：你好,hello,在吗">
                        </div>
                        <div class="form-group">
                            <label for="prompt-content-input">提示词内容</label>
                            <textarea id="prompt-content-input" rows="5" placeholder="输入你的提示词..."></textarea>
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '保存', class: 'btn-primary', handler: async () => {
                            const name = $('#prompt-name-input').value.trim();
                            const selectedFolderId = $('#prompt-folder-select').value;
                            if (!name) {
                                return UIManager.showToast("提示词名称不能为空");
                            }


                            const allPrompts = await DBHelper.getAll('prompts');
                            const promptsInFolder = allPrompts.filter(p => p.folderId === selectedFolderId);
                            if (promptsInFolder.some(p => p.name === name)) {
                                return UIManager.showToast(`名称 "${name}" 在该文件夹中已存在`);
                            }

                            let keywords = '[]';
                            if ($('#prompt-type-select').value === 'implicit') {
                                const keywordsInput = $('#prompt-keywords-input').value.trim();
                                if (keywordsInput) {
                                    const keywordsArray = keywordsInput.split(/,|，/).map(kw => kw.trim()).filter(Boolean);
                                    keywords = JSON.stringify(keywordsArray);
                                }
                            }

                            const newPrompt = {
                                id: Utils.generateId('prompt'),
                                createdAt: Date.now(),
                                name: name,
                                folderId: selectedFolderId,
                                type: $('#prompt-type-select').value,
                                keywords: keywords,
                                content: $('#prompt-content-input').value.trim(),
                                isActive: true,
                            };
                            await DBHelper.put('prompts', newPrompt);
                            UIManager.hideModal();
                            this.renderPromptsPage();
                        }
                    }
                ]
            });

            $('#prompt-type-select').onchange = (e) => {
                $('#prompt-keywords-group').style.display = e.target.value === 'implicit' ? 'block' : 'none';
            };
        },

        async handleEditPrompt(promptId) {
            const prompt = await DBHelper.get('prompts', promptId);
            const folders = await DBHelper.getAll('promptFolders');
            const folderOptions = `<option value="unclassified" ${prompt.folderId === 'unclassified' ? 'selected' : ''}>未分类</option>` +
                folders.map(f => `<option value="${f.id}" ${prompt.folderId === f.id ? 'selected' : ''}>${f.name}</option>`).join('');

            let keywordsString = '';
            if (prompt.type === 'implicit') {
                try {
                    const keywordsArray = JSON.parse(prompt.keywords);
                    if (Array.isArray(keywordsArray)) keywordsString = keywordsArray.join(', ');
                } catch (e) { }
            }

            UIManager.showModal({
                isPersistent: true,
                title: "修改提示词",
                body: `
                        <div class="form-group">
                            <label for="prompt-name-input">名称 (文件夹内唯一)</label>
                            <input type="text" id="prompt-name-input" value="${prompt.name}">
                        </div>
                        <div class="form-group">
                            <label for="prompt-folder-select">所属文件夹</label>
                            <select id="prompt-folder-select">${folderOptions}</select>
                        </div>
                        <div class="form-group">
                            <label>类型</label>
                            <select id="prompt-type-select">
                                <option value="explicit" ${prompt.type === 'explicit' ? 'selected' : ''}>显性</option>
                                <option value="implicit" ${prompt.type === 'implicit' ? 'selected' : ''}>隐性</option>
                            </select>
                        </div>
                        <div class="form-group" id="prompt-keywords-group" style="display:${prompt.type === 'implicit' ? 'block' : 'none'};">
                            <label for="prompt-keywords-input">关键词 (用中/英文逗号隔开)</label>
                            <input type="text" id="prompt-keywords-input" value="${keywordsString}" placeholder="例如：你好,hello,在吗">
                        </div>
                        <div class="form-group">
                            <label for="prompt-content-input">提示词内容</label>
                            <textarea id="prompt-content-input" rows="5">${prompt.content}</textarea>
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '保存', class: 'btn-primary', handler: async () => {
                            const name = $('#prompt-name-input').value.trim();
                            const selectedFolderId = $('#prompt-folder-select').value;
                            if (!name) return UIManager.showToast("提示词名称不能为空");


                            const allPrompts = await DBHelper.getAll('prompts');
                            const promptsInFolder = allPrompts.filter(p => p.folderId === selectedFolderId && p.id !== promptId);
                            if (promptsInFolder.some(p => p.name === name)) {
                                return UIManager.showToast(`名称 "${name}" 在该文件夹中已存在`);
                            }

                            let keywords = '[]';
                            if ($('#prompt-type-select').value === 'implicit') {
                                const keywordsInput = $('#prompt-keywords-input').value.trim();
                                if (keywordsInput) {
                                    const keywordsArray = keywordsInput.split(/,|，/).map(kw => kw.trim()).filter(Boolean);
                                    keywords = JSON.stringify(keywordsArray);
                                }
                            }

                            const updatedPrompt = {
                                ...prompt,
                                name: name,
                                folderId: selectedFolderId,
                                type: $('#prompt-type-select').value,
                                keywords: keywords,
                                content: $('#prompt-content-input').value.trim(),
                            };
                            await DBHelper.put('prompts', updatedPrompt);
                            UIManager.hideModal();
                            this.renderPromptsPage();
                        }
                    }
                ]
            });

            $('#prompt-type-select').onchange = (e) => {
                $('#prompt-keywords-group').style.display = e.target.value === 'implicit' ? 'block' : 'none';
            };
        },

        async viewPrompt(promptId) {
            const prompt = await DBHelper.get('prompts', promptId);
            UIManager.showModal({
                title: `查看: ${prompt.name}`,
                body: `<div class="details-section" style="margin-top:0;"><p style="max-height: 400px;">${prompt.content}</p></div>`,
                actions: [{ text: '关闭', class: 'btn-primary', handler: () => UIManager.hideModal() }]
            });
        },

        confirmDeletePrompt(promptId) {
            UIManager.showModal({
                title: '确认删除',
                body: '<p>确定要删除这个提示词吗？此操作无法恢复。</p>',
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '删除', class: 'btn-danger', handler: async () => {
                            await DBHelper.delete('prompts', promptId);
                            UIManager.hideModal();
                            this.renderPromptsPage();
                        }
                    }
                ]
            });
        },

        async togglePromptState(promptId, isActive) {
            const prompt = await DBHelper.get('prompts', promptId);
            prompt.isActive = isActive;
            await DBHelper.put('prompts', prompt);


            const promptCard = $(`#prompts-page-content .prompt-card[data-prompt-id="${promptId}"]`);
            if (promptCard) {
                promptCard.classList.toggle('inactive', !isActive);
            }
        },

        handleNewPromptFolder() {
            UIManager.showModal({
                title: "新建文件夹",
                body: `
                        <div class="form-group">
                            <label for="folder-name-input">文件夹名称 (不可重复)</label>
                            <input type="text" id="folder-name-input" placeholder="例如：世界观设定">
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '创建', class: 'btn-primary', handler: async () => {
                            const name = $('#folder-name-input').value.trim();
                            if (!name) return;
                            const existing = await DBHelper.getAll('promptFolders', 'name');
                            if (existing.some(f => f.name === name)) return alert('文件夹名称已存在');

                            const newFolder = {
                                id: Utils.generateId('folder'),
                                createdAt: Date.now(),
                                name: name,
                                isActive: true
                            };
                            await DBHelper.put('promptFolders', newFolder);
                            UIManager.hideModal();
                            this.renderPromptsPage();
                        }
                    }
                ]
            });
        },

        async toggleFolderState(folderId, isActive) {
            const folder = await DBHelper.get('promptFolders', folderId);
            folder.isActive = isActive;
            await DBHelper.put('promptFolders', folder);

            const promptsInFolder = (await DBHelper.getAll('prompts')).filter(p => p.folderId === folderId);
            for (const prompt of promptsInFolder) {
                prompt.isActive = isActive;
                await DBHelper.put('prompts', prompt);
            }
            this.renderPromptsPage();
        },

        confirmDeleteFolder(folderId) {
            UIManager.showModal({
                title: '确认删除文件夹',
                body: '<p>删除文件夹将同时删除其中所有的提示词，且无法恢复。确定要继续吗？</p>',
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '确认删除', class: 'btn-danger', handler: async () => {

                            const prompts = (await DBHelper.getAll('prompts')).filter(p => p.folderId === folderId);
                            for (const prompt of prompts) {
                                await DBHelper.delete('prompts', prompt.id);
                            }

                            await DBHelper.delete('promptFolders', folderId);
                            UIManager.hideModal();
                            this.renderPromptsPage();
                        }
                    }
                ]
            });
        },



        async showBindingModal(chatId) {
            const isGroup = chatId.startsWith('group-');
            const chatEntity = await DBHelper.get(isGroup ? 'groups' : 'contacts', chatId);
            const boundFolderIds = chatEntity.boundPromptFolderIds || [];
            const allFolders = await DBHelper.getAll('promptFolders');

            const boundFolders = allFolders.filter(f => boundFolderIds.includes(f.id));
            let boundFoldersHtml = boundFolders.map(f => `
                    <div class="bound-folder-card">
                        <i class="fas fa-folder-open"></i>
                        <span>${f.name}</span>
                    </div>
                `).join('');
            if (boundFolders.length === 0) {
                boundFoldersHtml = `<p style="text-align:center; color:#aaa; padding: 20px 0;">未绑定任何提示词文件夹</p>`;
            }

            const modalBody = `
                    <div class="binding-modal-header">
                        <h2>已绑定文件夹</h2>
                        <button id="open-folder-selection-btn" title="管理绑定"><i class="fas fa-link"></i></button>
                    </div>
                    <div id="bound-folders-list">${boundFoldersHtml}</div>
                `;

            UIManager.showModal({
                title: "绑定提示词",
                body: modalBody,
                actions: [{ text: '完成', class: 'btn-primary', handler: () => UIManager.hideModal() }]
            });


            modalContentWrapper.classList.add('binding-modal-content');

            $('#open-folder-selection-btn').onclick = () => this.showFolderSelectionModal(chatId, boundFolderIds);


            const originalHide = UIManager.hideModal;
            UIManager.hideModal = () => {
                modalContentWrapper.classList.remove('binding-modal-content');
                originalHide.call(UIManager);
                UIManager.hideModal = originalHide;
            };
        },

        async showFolderSelectionModal(chatId, currentlyBoundIds) {
            const allFolders = await DBHelper.getAll('promptFolders');
            const folderListHtml = allFolders.map(f => `
                    <label class="folder-selection-item">
                        <input type="checkbox" name="bind-folder" value="${f.id}" ${currentlyBoundIds.includes(f.id) ? 'checked' : ''}>
                        <i class="fas fa-folder"></i>
                        <span>${f.name}</span>
                    </label>
                `).join('');

            UIManager.showModal({
                title: "选择要绑定的文件夹",
                body: `<div class="folder-selection-list">${folderListHtml}</div>`,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => this.showBindingModal(chatId) },
                    {
                        text: '保存', class: 'btn-primary', handler: async () => {
                            const selectedIds = [...$$('input[name="bind-folder"]:checked')].map(cb => cb.value);
                            const isGroup = chatId.startsWith('group-');
                            const chatEntity = await DBHelper.get(isGroup ? 'groups' : 'contacts', chatId);
                            chatEntity.boundPromptFolderIds = selectedIds;
                            await DBHelper.put(isGroup ? 'groups' : 'contacts', chatEntity);
                            this.showBindingModal(chatId);
                        }
                    }
                ]
            });
        },
        handleSimulatedImageSend() {
            const defaultPlaceholderSvg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlYWVhZWEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9uLXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iI2FhYSI+6YCa6K6v5Zu+54mHPC90ZXh0Pjwvc3ZnPg==';
            const networkFallbackImage = 'https://z.wiki/autoupload/20240328/LV9Y.iShot_2024-03-28_22.38.16.png';

            UIManager.showModal({
                isPersistent: true,
                title: "发送图文消息",
                body: `
                        <div class="form-group">
                            <label>上传图片 (选填)</label>
                            <div class="avatar-uploader">
                                <img src="${defaultPlaceholderSvg}" id="sim-image-preview" style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover;">
                                <input type="file" id="sim-image-input" accept="image/*" style="display:none;">
                                <button class="upload-btn" onclick="document.getElementById('sim-image-input').click()">选择图片</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sim-image-desc">图片描述 (必填, AI会看到)</label>
                            <textarea id="sim-image-desc" rows="3" placeholder="请详细描述图片内容，AI将根据此描述进行回应..."></textarea>
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '发送', class: 'btn-primary', handler: async () => {
                            const description = $('#sim-image-desc').value.trim();
                            if (!description) {
                                return UIManager.showToast('图片描述不能为空');
                            }

                            let finalImageSrc = $('#sim-image-preview').src;

                            if (finalImageSrc === defaultPlaceholderSvg) {
                                finalImageSrc = networkFallbackImage;
                            }

                            const message = {
                                messageId: Utils.generateId('msg'),
                                content: `[图文] ${description}`,
                                type: 'sent',
                                segmentType: 'image_simulated',
                                cardData: {
                                    imageSrc: finalImageSrc,
                                    description: description
                                }
                            };

                            await this.handlePlayerSendMessage(message);
                            UIManager.hideModal();
                        }
                    }
                ]
            });

            $('#sim-image-input').addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    $('#sim-image-preview').src = await Utils.fileToBase64(file);
                }
            });
        },
        async handleNewMoment() {
            const defaultPlaceholderSvg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlYWVhZWEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9uLXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iI2FhYSI+6YCa6K6v5Zu+54mHPC90ZXh0Pjwvc3ZnPg==';
            UIManager.showModal({
                isPersistent: true,
                title: "发布动态",
                body: `
                        <div class="form-group">
                            <label for="new-moment-content">此刻的想法...</label>
                            <textarea id="new-moment-content" rows="5"></textarea>
                        </div>
                        <div class="form-group">
                            <label>上传图片 (可选, 最多9张)</label>
                             <div class="avatar-uploader">
                                <div id="new-moment-images-preview" style="display:flex; flex-wrap:wrap; gap:10px;"></div>
                                <input type="file" id="new-moment-images-input" accept="image/*" multiple style="display:none;">
                                <button class="upload-btn" onclick="document.getElementById('new-moment-images-input').click()">选择图片</button>
                            </div>
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '发布', class: 'btn-primary', handler: async () => {
                            const content = $('#new-moment-content').value.trim();
                            const imagesPreview = $$('#new-moment-images-preview img');
                            const images = Array.from(imagesPreview).map(img => img.src);

                            if (!content && images.length === 0) {
                                return UIManager.showToast("动态内容和图片不能都为空哦");
                            }

                            const myProfile = await DBHelper.get('profile', 'myProfile');
                            const newMoment = {
                                id: Utils.generateId('moment'),
                                circleId: appState.currentCircleId,
                                authorId: myProfile.id,
                                content: content,
                                images: images,
                                timestamp: Date.now(),
                                comments: []
                            };

                            await DBHelper.put('moments', newMoment);
                            UIManager.hideModal();
                            await UIManager.renderMomentsPage();


                            AIHandler.handleMomentsCommentRequest(newMoment.id);
                        }
                    }
                ]
            });

            $('#new-moment-images-input').addEventListener('change', async (e) => {
                const files = Array.from(e.target.files).slice(0, 9);
                const previewContainer = $('#new-moment-images-preview');
                previewContainer.innerHTML = '';
                for (const file of files) {
                    const base64 = await Utils.fileToBase64(file);
                    const img = document.createElement('img');
                    img.src = base64;
                    img.style.width = '60px';
                    img.style.height = '60px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '8px';
                    previewContainer.appendChild(img);
                }
            });
        },

        async handlePlayerLike(momentId) {
            const myProfile = await DBHelper.get('profile', 'myProfile');
            const moment = await DBHelper.get('moments', momentId);
            if (!moment) return;


            if (!moment.likes) {
                moment.likes = [];
            }

            const playerLikeIndex = moment.likes.indexOf(myProfile.name);

            if (playerLikeIndex > -1) {

                moment.likes.splice(playerLikeIndex, 1);
            } else {

                moment.likes.push(myProfile.name);
            }

            await DBHelper.put('moments', moment);


            const postElement = $(`[data-moment-id="${momentId}"]`);
            if (!postElement) return;

            const likeBtn = postElement.querySelector('[data-action="like"]');
            const interactionsContainer = postElement.querySelector('.post-interactions');
            const likesContainer = postElement.querySelector('.post-likes');
            const playerHasLiked = playerLikeIndex === -1;


            likeBtn.classList.toggle('liked', playerHasLiked);


            if (moment.likes.length > 0) {
                likesContainer.innerHTML = `<i class="fas fa-heart"></i> ${moment.likes.join(', ')}`;
                interactionsContainer.style.display = 'block';
            } else {
                likesContainer.innerHTML = '';

                if (moment.comments.length === 0) {
                    interactionsContainer.style.display = 'none';
                }
            }
        },

        toggleCommentInput(postElement, replyToAuthorName = null) {
            const inputWrapper = postElement.querySelector('.comment-input-wrapper');
            const inputField = inputWrapper.querySelector('input');


            if (inputWrapper.classList.contains('active') && inputWrapper.dataset.replyTo === (replyToAuthorName || '')) {
                inputWrapper.classList.remove('active');
                inputWrapper.dataset.replyTo = '';
                inputField.placeholder = '评论...';
                return;
            }

            inputWrapper.classList.add('active');
            postElement.querySelector('.post-interactions').style.display = 'block';

            if (replyToAuthorName) {
                inputField.placeholder = `回复 @${replyToAuthorName}:`;
                inputWrapper.dataset.replyTo = replyToAuthorName;
            } else {
                inputField.placeholder = '评论...';
                inputWrapper.dataset.replyTo = '';
            }

            inputField.focus();
        },

        async handlePlayerComment(momentId) {
            const postElement = $(`[data-moment-id="${momentId}"]`);
            const inputWrapper = postElement.querySelector('.comment-input-wrapper');
            const input = inputWrapper.querySelector('input');
            const content = input.value.trim();

            if (!content) return;

            const myProfile = await DBHelper.get('profile', 'myProfile');
            const moment = await DBHelper.get('moments', momentId);

            const newComment = {
                authorId: myProfile.id,
                content: content,
                timestamp: Date.now()
            };


            const replyTo = inputWrapper.dataset.replyTo;
            if (replyTo) {
                newComment.replyTo = replyTo;
            }

            if (!moment.comments) moment.comments = [];
            moment.comments.push(newComment);
            await DBHelper.put('moments', moment);


            const commentsList = postElement.querySelector('.post-comments-list');
            const commentDiv = document.createElement('div');
            commentDiv.className = 'post-comment-item';
            const replyHtml = replyTo ? `<span class="comment-reply-to"> 回复 </span><span class="comment-author">${replyTo}:</span>` : ':';
            commentDiv.innerHTML = `<span class="comment-author" style="color: #EDD4D8;">${myProfile.name}</span>${replyHtml} ${content}`;
            commentsList.appendChild(commentDiv);


            input.value = '';
            input.placeholder = '评论...';
            inputWrapper.dataset.replyTo = '';
            inputWrapper.classList.remove('active');


            AIHandler.handleMomentsPlayerCommentResponse(momentId, newComment);
        },

        handleMomentCommentInteractionStart(e, type) {
            const commentItem = e.target.closest('.post-comment-item');
            if (!commentItem) return;

            clearTimeout(appState.longPressTimer);

            const startAction = () => {
                const existingButton = $('.retract-button-wrapper.show');
                if (existingButton) existingButton.remove();
                this.showCommentOptions(commentItem);
            };

            appState.longPressTimer = setTimeout(startAction, 500);

            const clearLongPress = () => {
                clearTimeout(appState.longPressTimer);
                document.removeEventListener(type === 'mouse' ? 'mouseup' : 'touchend', clearLongPress);
                document.removeEventListener(type === 'mouse' ? 'mouseleave' : 'touchcancel', clearLongPress);
            };
            document.addEventListener(type === 'mouse' ? 'mouseup' : 'touchend', clearLongPress);
            document.addEventListener(type === 'mouse' ? 'mouseleave' : 'touchcancel', clearLongPress);
        },

        showCommentOptions(commentItem) {
            const wrapper = document.createElement('div');
            wrapper.className = 'retract-button-wrapper';
            wrapper.style.bottom = 'auto';
            wrapper.style.top = 'calc(100% + 2px)';

            wrapper.innerHTML = `<button class="retract-btn" data-action="delete-comment"><i class="fas fa-trash"></i> 删除</button>`;

            wrapper.addEventListener('click', (e) => {
                e.stopPropagation();
                const button = e.target.closest('.retract-btn');
                if (!button) return;

                const action = button.dataset.action;
                if (action === 'delete-comment') {
                    const momentId = commentItem.closest('.moments-post').dataset.momentId;
                    const commentIndex = Array.from(commentItem.parentNode.children).indexOf(commentItem);
                    this.confirmDeleteComment(momentId, commentIndex, commentItem);
                }
                wrapper.remove();
            });

            commentItem.style.position = 'relative';
            commentItem.appendChild(wrapper);
            setTimeout(() => wrapper.classList.add('show'), 10);

            const hideOnClickOutside = (event) => {
                if (!wrapper.contains(event.target)) {
                    wrapper.remove();
                    document.removeEventListener('click', hideOnClickOutside, true);
                }
            };
            document.addEventListener('click', hideOnClickOutside, true);
        },

        async confirmDeleteComment(momentId, commentIndex, commentElement) {
            const moment = await DBHelper.get('moments', momentId);
            const comment = moment?.comments?.[commentIndex];
            if (!comment) return;

            const myProfile = await DBHelper.get('profile', 'myProfile');
            const allContacts = await DBHelper.getAll('contacts');
            let authorName = "未知用户";
            if (comment.authorId === myProfile.id) {
                authorName = myProfile.name;
            } else {
                const contact = allContacts.find(c => c.id === comment.authorId);
                authorName = contact ? (contact.remark || contact.name) : (comment.authorId || '未知用户');
            }

            UIManager.showModal({
                title: "确认删除",
                body: `
                        <p>确定要删除这条评论吗？</p>
                        <div style="background: rgba(0,0,0,0.05); padding: 10px; border-radius: 8px; margin-top: 10px; font-size: 0.9rem; color: var(--text-color-medium);">
                            <strong>${authorName}:</strong> ${comment.content}
                        </div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '删除', class: 'btn-danger', handler: async () => {
                            moment.comments.splice(commentIndex, 1);
                            await DBHelper.put('moments', moment);
                            commentElement.remove();
                            UIManager.showToast("评论已删除");
                            UIManager.hideModal();
                        }
                    }
                ]
            });
        },

        async handleSwitchCircle() {
            const circles = await DBHelper.getAll('circles');
            if (circles.length <= 1) {
                return UIManager.showToast("没有其他圈子可以切换");
            }
            UIManager.showBottomSheet({
                title: '切换圈子',
                items: circles.map(c => ({ value: c.id, text: c.name })),
                onSelect: async (value, text) => {
                    await UIManager.renderMomentsPage(value);
                    UIManager.hideSidebar();
                }
            });
        },

        async handleViewCircleInfo() {
            const circle = await DBHelper.get('circles', appState.currentCircleId);
            if (!circle) return;

            const allContacts = await DBHelper.getAll('contacts');
            const memberNames = circle.memberIds.map(id => allContacts.find(c => c.id === id)?.name || '未知好友').join('、');
            const extraNames = circle.extraMembers || '无';
            const boundFolders = (await DBHelper.getAll('promptFolders')).filter(f => circle.boundPromptFolderIds.includes(f.id));
            const boundFolderNames = boundFolders.map(f => f.name).join('、') || '无';

            UIManager.showModal({
                title: "圈子信息",
                body: `
                        <div class="details-card">
                            <div class="details-header">
                                <img src="${circle.backgroundImage || 'https://z.wiki/autoupload/20240706/3g0x.250-1_2_0.png'}" class="avatar" style="border-radius: 8px;">
                                <div class="details-info">
                                    <div class="name">${circle.name}</div>
                                </div>
                            </div>
                        </div>
                        <div class="details-card">
                            <div class="details-section">
                                <div class="details-section-title">圈内好友</div>
                                <p style="max-height: 80px;">${memberNames}</p>
                            </div>
                             <div class="details-section">
                                <div class="details-section-title">额外好友</div>
                                <p>${extraNames}</p>
                            </div>
                             <div class="details-section">
                                <div class="details-section-title">绑定提示词</div>
                                <p>${boundFolderNames}</p>
                            </div>
                        </div>
                    `,
                actions: [{ text: '关闭', class: 'btn-primary', handler: () => UIManager.hideModal() }]
            });
        },

        async handleAddCircle() {
            const allContacts = await DBHelper.getAll('contacts');
            const allFolders = await DBHelper.getAll('promptFolders');
            if (allContacts.length === 0) {
                return UIManager.showToast("通讯录中还没有好友，无法创建圈子。");
            }

            const membersHtml = allContacts.map(f => `<label class="member-select-item"><input type="checkbox" name="circle-members" value="${f.id}"><span>${f.name}</span></label>`).join('');
            const foldersHtml = allFolders.map(f => `<label class="member-select-item"><input type="checkbox" name="circle-folders" value="${f.id}"><span>${f.name}</span></label>`).join('');

            UIManager.showModal({
                title: "新增圈子",
                body: `
                        <div class="form-group"><label for="circle-name-input">圈子名称</label><input type="text" id="circle-name-input"></div>
                        <div class="form-group"><label>圈内好友 (至少选1个)</label><div class="member-select-list">${membersHtml}</div></div>
                        <div class="form-group"><label for="circle-extra-input">额外好友 (选填, 逗号隔开)</label><input type="text" id="circle-extra-input" placeholder="三三,入入,vv"></div>
                        <div class="form-group"><label>绑定提示词文件夹 (可选)</label><div class="member-select-list" style="max-height:150px;">${foldersHtml}</div></div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '创建', class: 'btn-primary', handler: async () => {
                            const name = $('#circle-name-input').value.trim();
                            if (!name) return UIManager.showToast("圈子名称不能为空");

                            const existing = await DBHelper.getAll('circles', 'name');
                            if (existing.some(c => c.name === name)) return UIManager.showToast("该圈子名称已存在");

                            const memberIds = [...$$('input[name="circle-members"]:checked')].map(cb => cb.value);
                            if (memberIds.length === 0) return UIManager.showToast("至少选择一名好友");

                            const boundPromptFolderIds = [...$$('input[name="circle-folders"]:checked')].map(cb => cb.value);

                            const newCircle = {
                                id: Utils.generateId('circle'),
                                name: name,
                                memberIds: memberIds,
                                extraMembers: $('#circle-extra-input').value.trim(),
                                boundPromptFolderIds: boundPromptFolderIds,
                                backgroundImage: null,
                                createdAt: Date.now(),
                                lastRefreshed: 0
                            };

                            await DBHelper.put('circles', newCircle);
                            UIManager.hideModal();
                            UIManager.hideSidebar();
                            await UIManager.renderMomentsPage(newCircle.id);
                        }
                    }
                ]
            });
        },

        async handleEditCircle(circleId) {
            if (!circleId) return UIManager.showToast("请先选择一个圈子");
            const circle = await DBHelper.get('circles', circleId);
            const allContacts = await DBHelper.getAll('contacts');
            const allFolders = await DBHelper.getAll('promptFolders');

            const membersHtml = allContacts.map(f => `<label class="member-select-item"><input type="checkbox" name="circle-members" value="${f.id}" ${circle.memberIds.includes(f.id) ? 'checked' : ''}><span>${f.name}</span></label>`).join('');
            const foldersHtml = allFolders.map(f => `<label class="member-select-item"><input type="checkbox" name="circle-folders" value="${f.id}" ${circle.boundPromptFolderIds.includes(f.id) ? 'checked' : ''}><span>${f.name}</span></label>`).join('');

            UIManager.showModal({
                title: "修改圈子",
                body: `
                        <div class="form-group"><label for="circle-name-input">圈子名称</label><input type="text" id="circle-name-input" value="${circle.name}"></div>
                        <div class="form-group"><label>圈内好友 (至少选1个)</label><div class="member-select-list">${membersHtml}</div></div>
                        <div class="form-group"><label for="circle-extra-input">额外好友 (选填, 逗号隔开)</label><input type="text" id="circle-extra-input" value="${circle.extraMembers || ''}"></div>
                        <div class="form-group"><label>绑定提示词文件夹 (可选)</label><div class="member-select-list" style="max-height:150px;">${foldersHtml}</div></div>
                    `,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '保存', class: 'btn-primary', handler: async () => {
                            const name = $('#circle-name-input').value.trim();
                            if (!name) return UIManager.showToast("圈子名称不能为空");

                            const existing = (await DBHelper.getAll('circles', 'name')).filter(c => c.id !== circleId);
                            if (existing.some(c => c.name === name)) return UIManager.showToast("该圈子名称已存在");

                            const memberIds = [...$$('input[name="circle-members"]:checked')].map(cb => cb.value);
                            if (memberIds.length === 0) return UIManager.showToast("至少选择一名好友");

                            const boundPromptFolderIds = [...$$('input[name="circle-folders"]:checked')].map(cb => cb.value);

                            const updatedCircle = { ...circle, name, memberIds, boundPromptFolderIds, extraMembers: $('#circle-extra-input').value.trim() };
                            await DBHelper.put('circles', updatedCircle);
                            UIManager.hideModal();
                            await UIManager.renderMomentsPage();
                        }
                    }
                ]
            });
        },

        async handleDeleteCircle() {
            const circles = await DBHelper.getAll('circles');
            if (circles.length === 0) return UIManager.showToast("没有可删除的圈子");

            const circlesHtml = circles.map(c => `<label class="member-select-item"><input type="checkbox" name="delete-circle" value="${c.id}"><span>${c.name}</span></label>`).join('');
            UIManager.showModal({
                title: "删除圈子",
                body: `<p style="margin-bottom:10px;">选择要删除的圈子（将同时删除圈子下的所有动态）：</p><div class="member-select-list">${circlesHtml}</div>`,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '删除', class: 'btn-danger', handler: async () => {
                            const idsToDelete = [...$$('input[name="delete-circle"]:checked')].map(cb => cb.value);
                            if (idsToDelete.length === 0) return;

                            for (const id of idsToDelete) {
                                await DBHelper.delete('circles', id);
                                const momentsToDelete = (await DBHelper.getAll('moments')).filter(m => m.circleId === id);
                                for (const moment of momentsToDelete) {
                                    await DBHelper.delete('moments', moment.id);
                                }
                            }

                            if (idsToDelete.includes(appState.currentCircleId)) {
                                appState.currentCircleId = null;
                            }

                            UIManager.hideModal();
                            UIManager.hideSidebar();
                            await UIManager.renderMomentsPage();
                        }
                    }
                ]
            });
        },

        async handleExportPrompts() {
            const folders = await DBHelper.getAll('promptFolders');
            if (folders.length === 0) {
                return UIManager.showToast("没有可导出的文件夹");
            }
            const folderListHtml = folders.map(f => `
                    <label class="folder-selection-item">
                        <input type="checkbox" name="export-folder" value="${f.id}">
                        <i class="fas fa-folder"></i>
                        <span>${f.name}</span>
                    </label>
                `).join('');

            UIManager.showModal({
                title: "选择要导出的文件夹",
                body: `<div class="folder-selection-list">${folderListHtml}</div>`,
                actions: [
                    { text: '取消', class: 'btn-secondary', handler: () => UIManager.hideModal() },
                    {
                        text: '导出', class: 'btn-primary', handler: async () => {
                            const selectedFolderIds = [...$$('input[name="export-folder"]:checked')].map(cb => cb.value);
                            if (selectedFolderIds.length === 0) {
                                return UIManager.showToast("请至少选择一个文件夹");
                            }

                            const allPrompts = await DBHelper.getAll('prompts');


                            let filenamePart;
                            if (selectedFolderIds.length === 1) {
                                const folder = folders.find(f => f.id === selectedFolderIds[0]);
                                filenamePart = folder ? folder.name : '未知文件夹';
                            } else {
                                filenamePart = '多个文件夹_提示词导出';
                            }
                            const finalFilename = `${filenamePart}_${new Date().toISOString().slice(0, 10)}.json`;


                            const foldersToExport = folders.filter(f => selectedFolderIds.includes(f.id));
                            const promptsToExport = allPrompts.filter(p => selectedFolderIds.includes(p.folderId));

                            const exportData = {
                                folders: foldersToExport,
                                prompts: promptsToExport
                            };

                            const jsonString = JSON.stringify(exportData, null, 2);
                            const blob = new Blob([jsonString], { type: "application/json" });
                            const url = URL.createObjectURL(blob);

                            const a = document.createElement('a');
                            a.href = url;
                            a.download = finalFilename;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);

                            UIManager.hideModal();
                        }
                    }
                ]
            });
        },

        handleImportPrompts() {
            const fileInput = $('#import-prompts-input');
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = async (event) => {
                    try {
                        const importedData = JSON.parse(event.target.result);

                        if (!importedData.folders || !importedData.prompts) {
                            return UIManager.showToast("文件格式不正确");
                        }

                        const existingFolders = await DBHelper.getAll('promptFolders');
                        let importedCount = 0;

                        for (const importedFolder of importedData.folders) {
                            if (existingFolders.some(f => f.name === importedFolder.name)) {
                                UIManager.showToast(`已跳过：文件夹 "${importedFolder.name}" 已存在`);
                                continue;
                            }

                            const oldFolderId = importedFolder.id;
                            const newFolder = {
                                ...importedFolder,
                                id: Utils.generateId('folder'),
                                createdAt: Date.now()
                            };
                            await DBHelper.put('promptFolders', newFolder);


                            const promptsToImport = importedData.prompts.filter(p => p.folderId === oldFolderId);
                            for (const importedPrompt of promptsToImport) {
                                const newPrompt = {
                                    ...importedPrompt,
                                    id: Utils.generateId('prompt'),
                                    folderId: newFolder.id,
                                    createdAt: Date.now()
                                };
                                await DBHelper.put('prompts', newPrompt);
                                importedCount++;
                            }
                        }

                        UIManager.showToast(`导入完成，共导入 ${importedCount} 条提示词`);
                        this.renderPromptsPage();

                    } catch (error) {
                        console.error("导入失败: ", error);
                        UIManager.showToast("导入失败，文件可能已损坏");
                    } finally {

                        fileInput.value = '';
                    }
                };
                reader.readAsText(file);
            };
            fileInput.click();
        }

    };



    async function loadFontsAfterSplash() {
        try {

            await EventManager.loadCustomFontsOnStartup();
            console.log("自定义字体文件已在后台准备就绪。");
        } catch (error) {
            console.error("后台自定义字体加载失败:", error);
        }
    }


    async function initApp() {

        setTimeout(() => {
            const splash = $('#splash-screen');
            if (splash) {
                splash.classList.add('hidden');

                setTimeout(() => {
                    splash.style.display = 'none';
                }, 500);
            }
        }, 1500);

        try {

            await DBHelper.init();
            await AIHandler.loadApiConfig();


            let profile = await DBHelper.get('profile', 'myProfile');
            if (!profile) {
                profile = {
                    id: 'myProfile',
                    name: '商时序',
                    gender: '女',
                    avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=',
                    background: '',
                };
                await DBHelper.put('profile', profile);
            }
            $('#my-avatar').src = profile.avatar;
            appState.favoriteEmojis = profile.favoriteEmojis || [];

            EventManager.init();

            const defaults = {
                id: 'chatSettings',
                memoryInterconnection: false,
                historyLength: 20,
                showMyNameInGroup: true,
                showNamesInPrivate: false,
                bottomBarOffset: false,
                enterToSend: false,
                theme: 'neumorphic',
            };
            const savedSettings = await DBHelper.get('apiConfig', 'chatSettings');
            const initialChatSettings = { ...defaults, ...savedSettings };
            appState.theme = initialChatSettings.theme;
            EventManager.applyChatSettings(initialChatSettings);
            await EventManager.applyBackgroundSettings();
            await EventManager.applyBubbleSettings();
            await EventManager.applyBubbleFontSize();

            EventManager.loadAndApplyFontsInBackground();


            await EventManager.initEmojiPanel();
            await UIManager.navigateTo('messages');

        } catch (error) {
            console.error("应用初始化失败:", error);
            document.body.innerHTML = `<div style="text-align:center; padding: 50px; color: red;">应用初始化失败，请检查浏览器是否支持IndexedDB或清除网站数据后重试。错误: ${error}</div>`;
        }
    }

    document.addEventListener('DOMContentLoaded', initApp);

})();