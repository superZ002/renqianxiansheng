document.addEventListener('DOMContentLoaded', function() {
    var tabBtns = document.querySelectorAll('.tab-btn');
    var tabContents = document.querySelectorAll('.tab-content');
    var fileInput = document.getElementById('fileInput');
    var uploadArea = document.getElementById('uploadArea');
    var uploadPlaceholder = document.getElementById('uploadPlaceholder');
    var previewWrap = document.getElementById('previewWrap');
    var previewImage = document.getElementById('previewImage');
    var removeBtn = document.getElementById('removeBtn');
    var textInput = document.getElementById('textInput');
    var charCount = document.getElementById('charCount');
    var generateBtn = document.getElementById('generateBtn');
    var resultSection = document.getElementById('resultSection');
    var loadingSection = document.getElementById('loadingSection');
    var loadingText = document.getElementById('loadingText');
    var inputSection = document.querySelector('.input-section');
    var tagObject = document.getElementById('tagObject');
    var tagEmotion = document.getElementById('tagEmotion');
    var tagOccasion = document.getElementById('tagOccasion');
    var resultClassic = document.getElementById('resultClassic');
    var resultModern = document.getElementById('resultModern');
    var resultHumor = document.getElementById('resultHumor');
    var resultDifang = document.getElementById('resultDifang');
    var regionTags = document.getElementById('regionTags');
    var copyBtns = document.querySelectorAll('.copy-btn');
    var copyToast = document.getElementById('copyToast');
    var toastSeal = copyToast.querySelector('.toast-seal');
    var toastText = copyToast.querySelector('.toast-text');
    var retryBtn = document.getElementById('retryBtn');
    var shareBtn = document.getElementById('shareBtn');
    var settingsBtn = document.getElementById('settingsBtn');
    var settingsModal = document.getElementById('settingsModal');
    var modalOverlay = document.getElementById('modalOverlay');
    var modalClose = document.getElementById('modalClose');
    var modelOptions = document.querySelectorAll('.model-option');
    var apiKeyInput = document.getElementById('apiKeyInput');
    var modelIdInput = document.getElementById('modelIdInput');
    var apiEndpointInput = document.getElementById('apiEndpointInput');
    var styleClassic = document.getElementById('styleClassic');
    var styleModern = document.getElementById('styleModern');
    var styleHumor = document.getElementById('styleHumor');
    var styleDifang = document.getElementById('styleDifang');
    var saveSettingsBtn = document.getElementById('saveSettingsBtn');
    var resetSettingsBtn = document.getElementById('resetSettingsBtn');
    var demoBtn = document.getElementById('demoBtn');
    var posterBtn = document.getElementById('posterBtn');
    var posterOverlay = document.getElementById('posterOverlay');
    var posterImage = document.getElementById('posterImage');
    var posterClose = document.getElementById('posterClose');
    var posterTemplate = document.getElementById('posterTemplate');
    var ptImage = document.getElementById('ptImage');
    var ptQuotes = document.getElementById('ptQuotes');
    var visitCountEl = document.getElementById('visitCount');

    var currentFile = null;
    var currentTab = 'image';
    var loadingInterval = null;
    var toastTimeout = null;
    var model = null;
    var modelLoading = false;
    var settings = loadSettings();

    var loadingTexts = ['显圣中...','神识解析中...','寻章摘句...','灵气汇聚中...','神光初现...'];

    var mysteriousPoems = [
        '造化钟神秀，阴阳割昏晓。',
        '此中有真意，欲辨已忘言。',
        '月下飞天镜，云生结海楼。',
        '江流天地外，山色有无中。',
        '醉后不知天在水，满船清梦压星河。',
        '落霞与孤鹜齐飞，秋水共长天一色。',
        '山随平野尽，江入大荒流。',
        '星垂平野阔，月涌大江流。'
    ];

    var quoteLibrary = {
        sunset: { object: '夕阳', emotion: '绚烂', occasion: '黄昏',
            classic: ['落霞与孤鹜齐飞，秋水共长天一色。','夕阳无限好，只是近黄昏。','大漠孤烟直，长河落日圆。'],
            modern: ['黄昏把天空酿成了橘色的酒。','落日是太阳留给人间最后的吻。','晚霞是白昼写给黑夜的情书。'],
            humor: ['这晚霞，朋友圈都发爆了！','太阳下班都这么有仪式感。','今日份天空限定皮肤已解锁。'],
            difang: ['老天爷把晚霞染得通红通红的，瞅着就暖和！']
        },
        mountain: { object: '山川', emotion: '壮阔', occasion: '登高',
            classic: ['会当凌绝顶，一览众山小。','横看成岭侧成峰，远近高低各不同。','山重水复疑无路，柳暗花明又一村。'],
            modern: ['站在山顶，世界都变小了。','群山起伏，像大地在呼吸。','云在山顶安了家。'],
            humor: ['腿已废，但朋友圈值了！','山：你上来啊。我：我下来了。','这高度，恐高症当场去世。'],
            difang: ['这山瞅着老鼻子高了，爬上去老费劲了！']
        },
        sea: { object: '大海', emotion: '辽阔', occasion: '海边',
            classic: ['海内存知己，天涯若比邻。','百川东到海，何时复西归。','海上生明月，天涯共此时。'],
            modern: ['海的蓝，是天空的倒影。','浪花是大海说不完的话。','面朝大海，春暖花开。'],
            humor: ['海：我太南了。','这海浪，比我人生还跌宕。','大海啊全是水，我啊全是汗。'],
            difang: ['大海啊全是水，瞅着就让人心里敞亮！']
        },
        city: { object: '城市', emotion: '喧嚣', occasion: '夜景',
            classic: ['东风夜放花千树，更吹落、星如雨。','夜市千灯照碧云，高楼红袖客纷纷。','山外青山楼外楼，西湖歌舞几时休。'],
            modern: ['万家灯火，没有一盏为我而亮。','城市的夜晚，是失眠人的天堂。','霓虹闪烁，像在说晚安又像早安。'],
            humor: ['打工人的夜，只有加班灯最亮。','这城市那么空，这回忆那么凶。','深夜emo，适合发朋友圈。'],
            difang: ['这城市老热闹了，灯火通明的！']
        },
        food: { object: '美食', emotion: '满足', occasion: '聚餐',
            classic: ['人间定无可意，怎换得玉脍丝莼。','食不厌精，脍不厌细。','柴门酒肉臭，路有冻死骨。'],
            modern: ['胃填满了，心就空了。','美食是治愈一切的良药。','卡路里充值成功。'],
            humor: ['没有什么是一顿火锅解决不了的。','减肥是明天的事，今天先吃。','这顿饭，朋友圈先吃。'],
            difang: ['这饭老香了，造得贼饱！']
        },
        flower: { object: '繁花', emotion: '美好', occasion: '春日',
            classic: ['等闲识得东风面，万紫千红总是春。','乱花渐欲迷人眼，浅草才能没马蹄。','黄四娘家花满蹊，千朵万朵压枝低。'],
            modern: ['花盛开的样子，像极了春天。','每朵花，都有它的花期。','春天没有一朵花是多余的。'],
            humor: ['这花，比我对象还好看。','春天到了，我也想开花。','拍花一时爽，修图火葬场。'],
            difang: ['这花开得老好看了，贼稀罕！']
        },
        rain: { object: '细雨', emotion: '静谧', occasion: '雨天',
            classic: ['清明时节雨纷纷，路上行人欲断魂。','好雨知时节，当春乃发生。','夜阑卧听风吹雨，铁马冰河入梦来。'],
            modern: ['雨是天空的眼泪，也是大地的吻。','听雨的声音，像在说悄悄话。','下雨天，和音乐更配哦。'],
            humor: ['雨：我就下下，你就晒晒。','没带伞的我，像个落汤鸡。','这雨，比依萍找她爸要钱那天还大。'],
            difang: ['这雨下得哗哗的，老凉快了！']
        },
        night: { object: '星空', emotion: '深邃', occasion: '深夜',
            classic: ['醉后不知天在水，满船清梦压星河。','危楼高百尺，手可摘星辰。','星垂平野阔，月涌大江流。'],
            modern: ['每颗星星，都是一个愿望。','夜空是藏满秘密的黑丝绒。','月亮不睡我不睡，我是秃头小宝贝。'],
            humor: ['数羊数到星星都睡了。','熬夜冠军在此，不服来战。','星空很美，但我更想睡觉。'],
            difang: ['这星星老多了，瞅得人眼睛都花了！']
        }
    };

    var categoryMap = {
        'sunset': 'sunset', 'sun': 'sunset', 'dusk': 'sunset', 'orange': 'sunset',
        'alp': 'mountain', 'mountain': 'mountain', 'cliff': 'mountain', 'volcano': 'mountain', 'peak': 'mountain',
        'seashore': 'sea', 'beach': 'sea', 'ocean': 'sea', 'water': 'sea', 'lake': 'sea', 'boat': 'sea',
        'street': 'city', 'building': 'city', 'skyscraper': 'city', 'city': 'city', 'traffic': 'city',
        'plate': 'food', 'food': 'food', 'restaurant': 'food', 'kitchen': 'food', 'dish': 'food',
        'flower': 'flower', 'rose': 'flower', 'lily': 'flower', 'garden': 'flower', 'bouquet': 'flower',
        'rain': 'rain', 'cloud': 'rain', 'storm': 'rain', 'umbrella': 'rain',
        'star': 'night', 'moon': 'night', 'night': 'night', 'galaxy': 'night', 'planet': 'night'
    };

    init();

    function init() {
        initTabSwitching();
        initImageUpload();
        initTextInput();
        initRegionSelect();
        initGenerate();
        initCopyButtons();
        initRetry();
        initShare();
        initSettings();
        initDemo();
        initPoster();
        initVisitCounter();
    }

    function loadSettings() {
        var defaults = {
            model: 'doubao',
            apiKey: 'ark-165882b4-e46d-49ba-894e-8a6ea2f78a1a-1f807',
            modelId: 'ep-20260701145348-vvc58',
            endpoint: '',
            region: '北方',
            styles: { classic: true, modern: true, humor: true, difang: true }
        };
        try {
            var saved = localStorage.getItem('rxiansheng_settings');
            if (saved) {
                var parsed = JSON.parse(saved);
                return Object.assign({}, defaults, parsed);
            }
        } catch (e) {}
        return defaults;
    }

    function saveSettings() {
        try { localStorage.setItem('rxiansheng_settings', JSON.stringify(settings)); }
        catch (e) {}
    }

    function initRegionSelect() {
        var activeTag = regionTags.querySelector('.region-tag[data-region="' + (settings.region || '北方') + '"]');
        if (activeTag) {
            regionTags.querySelectorAll('.region-tag').forEach(function(t) { t.classList.remove('active'); });
            activeTag.classList.add('active');
        }
        regionTags.addEventListener('click', function(e) {
            var tag = e.target.closest('.region-tag');
            if (!tag) return;
            regionTags.querySelectorAll('.region-tag').forEach(function(t) { t.classList.remove('active'); });
            tag.classList.add('active');
            settings.region = tag.getAttribute('data-region');
            saveSettings();
        });
    }

    function initSettings() {
        settingsBtn.addEventListener('click', openSettings);
        modalClose.addEventListener('click', closeSettings);
        modalOverlay.addEventListener('click', closeSettings);
        modelOptions.forEach(function(opt) {
            opt.addEventListener('click', function() {
                modelOptions.forEach(function(o) { o.classList.remove('active'); });
                this.classList.add('active');
                settings.model = this.getAttribute('data-model');
            });
        });
        saveSettingsBtn.addEventListener('click', function() {
            settings.apiKey = apiKeyInput.value.trim();
            settings.modelId = modelIdInput.value.trim();
            settings.endpoint = apiEndpointInput.value.trim();
            settings.styles.classic = styleClassic.checked;
            settings.styles.modern = styleModern.checked;
            settings.styles.humor = styleHumor.checked;
            settings.styles.difang = styleDifang.checked;
            saveSettings();
            closeSettings();
            showToast('设置已保存', 'success');
        });
        resetSettingsBtn.addEventListener('click', function() {
            settings = {
                model: 'doubao',
                apiKey: 'ark-165882b4-e46d-49ba-894e-8a6ea2f78a1a-1f807',
                modelId: 'ep-20260701145348-vvc58',
                endpoint: '',
                region: '北方',
                styles: { classic: true, modern: true, humor: true, difang: true }
            };
            populateSettingsForm();
            regionTags.querySelectorAll('.region-tag').forEach(function(t) {
                t.classList.toggle('active', t.getAttribute('data-region') === '北方');
            });
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !settingsModal.hidden) closeSettings();
        });
    }

    function openSettings() { populateSettingsForm(); settingsModal.hidden = false; }
    function closeSettings() { settingsModal.hidden = true; }

    function populateSettingsForm() {
        modelOptions.forEach(function(opt) {
            opt.classList.toggle('active', opt.getAttribute('data-model') === settings.model);
        });
        apiKeyInput.value = settings.apiKey || '';
        modelIdInput.value = settings.modelId || '';
        apiEndpointInput.value = settings.endpoint || '';
        styleClassic.checked = settings.styles.classic !== false;
        styleModern.checked = settings.styles.modern !== false;
        styleHumor.checked = settings.styles.humor !== false;
        styleDifang.checked = settings.styles.difang !== false;
    }

    function initTabSwitching() {
        tabBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                switchTab(this.getAttribute('data-tab'));
            });
        });
    }

    function switchTab(tab) {
        currentTab = tab;
        tabBtns.forEach(function(btn) {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
        });
        tabContents.forEach(function(content) {
            content.classList.toggle('active', content.id === 'tab-' + tab);
        });
    }

    function initImageUpload() {
        uploadArea.addEventListener('click', function() { fileInput.click(); });
        fileInput.addEventListener('change', function(e) {
            var file = e.target.files[0];
            if (file) handleFile(file);
        });
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            removeImage();
        });
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            var files = e.dataTransfer.files;
            if (files.length > 0) handleFile(files[0]);
        });
    }

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            showToast('请选择图片文件', 'error');
            return;
        }
        currentFile = file;
        var reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            uploadPlaceholder.style.display = 'none';
            previewWrap.hidden = false;
        };
        reader.readAsDataURL(file);
    }

    function removeImage() {
        fileInput.value = '';
        previewImage.src = '';
        currentFile = null;
        uploadPlaceholder.style.display = '';
        previewWrap.hidden = true;
    }

    function initTextInput() {
        textInput.addEventListener('input', function() {
            var len = this.value.length;
            var maxLen = 200;
            if (len > maxLen) this.value = this.value.substring(0, maxLen);
            charCount.textContent = Math.min(len, maxLen) + ' / ' + maxLen;
        });
    }

    function initGenerate() {
        generateBtn.addEventListener('click', function() {
            if (currentTab === 'image' && !currentFile) {
                showToast('请先上传图片', 'error');
                return;
            }
            if (currentTab === 'text' && !textInput.value.trim()) {
                showToast('请输入文字描述', 'error');
                return;
            }
            startGeneration();
        });
    }

    function startGeneration() {
        inputSection.style.display = 'none';
        resultSection.hidden = true;
        loadingSection.hidden = false;
        var textIndex = 0;
        loadingText.textContent = loadingTexts[0];
        loadingInterval = setInterval(function() {
            textIndex++;
            if (textIndex < loadingTexts.length) loadingText.textContent = loadingTexts[textIndex];
        }, 500);

        if (settings.apiKey) {
            callVLM();
        } else if (currentTab === 'image' && currentFile && window.ml5) {
            generateFromImage();
        } else {
            setTimeout(function() {
                if (currentTab === 'text') generateFromText();
                else showMysteryResult();
            }, 2000);
        }
    }

    function callVLM() {
        var userPrompt = buildPrompt();
        var imageBase64 = null;
        if (currentTab === 'image' && currentFile && previewImage.src) {
            imageBase64 = previewImage.src;
        }
        if (settings.model === 'doubao') callDoubao(userPrompt, imageBase64);
        else callGLM(userPrompt, imageBase64);
    }

    function buildPrompt() {
        var userText = textInput.value.trim();
        var region = settings.region || '北方';
        var prompt = '## 角色设定\n';
        prompt += '你是一个"文化显圣"助手，专门帮助用户在社交场合用有文化、有品位的词句表达此刻的感受。你的输出要有文化底蕴，拒绝网络烂梗和廉价鸡汤。\n\n';
        prompt += '## 任务\n';
        prompt += '根据用户上传的图片（或输入的场景描述），从以下四种风格中各生成一句高质量文案：\n\n';
        prompt += '### 1. 古风雅韵（优化版）\n';
        prompt += '- 生成逻辑（按顺序执行）：\n';
        prompt += '  * 第一步：分析图片或文字描述的画面意境，匹配最合适的经典古诗词（优先唐诗宋词）\n';
        prompt += '  * 第二步：如果匹配到合适的经典诗句，直接引用并注明作者和诗名\n';
        prompt += '  * 第三步：如果没有匹配到合适的经典诗词，再自行创作古风句子（保持文言韵味）\n';
        prompt += '- 引用要求：\n';
        prompt += '  * 必须准确，不能编造或篡改原诗\n';
        prompt += '  * 意境要高度契合画面，而非牵强附会\n';
        prompt += '  * 优先选择传播度高的名句（让用户有"我知道这句"的共鸣感）\n';
        prompt += '- 创作要求（仅当无匹配时）：\n';
        prompt += '  * 保持古风韵味，用词典雅\n';
        prompt += '  * 参考唐诗宋词的审美标准\n';
        prompt += '  * 字数不超过20字\n';
        prompt += '- 输出格式示例：\n';
        prompt += '  引用版："落霞与孤鹜齐飞，秋水共长天一色。"——王勃《滕王阁序》\n';
        prompt += '  创作版："层云遮处光如隙，一窗澄明接远天"\n\n';
        prompt += '### 2. 现代文学\n';
        prompt += '- 风格：散文诗或现代文学金句\n- 要求：有哲思或情感共鸣，语言精炼有力\n- 参考风格：类似鲁迅、张爱玲、村上春树、余华等作家的语言质感\n- 字数：不超过25字\n\n';
        prompt += '### 3. 冷幽默\n';
        prompt += '- 风格：有文化感的黑色幽默或冷幽默\n- 核心要求：\n';
        prompt += '  * 用严肃、一本正经的句式，讲一件轻松或不严肃的事（反差感）\n';
        prompt += '  * 可以化用成语、俗语、古诗，制造语言巧思\n';
        prompt += '  * 禁止使用网络流行语（如"绝绝子""神仙级""YYDS"等）\n';
        prompt += '  * 禁止单纯玩烂梗或生硬吐槽\n';
        prompt += '- 参考示例：\n  * "天上在开股东大会，乌云是反对派，光是最后的决议。"\n  * "云层密谋已久，却被一束光出卖了。"\n';
        prompt += '- 字数：不超过20字\n\n';
        prompt += '### 4. 地方韵味（优化版）\n';
        prompt += '- 风格：用指定地区的方言文化来创作，核心目标是"让当地人一眼认出\'这就是我家的话\'"\n';
        prompt += '- 核心要求：\n';
        prompt += '  * 每句话至少包含3-5个该地区独有的方言词汇/句式，而非"普通话+方言词点缀"\n';
        prompt += '  * 方言词汇必须真实存在，禁止胡编乱造\n';
        prompt += '  * 保留方言的"语气感"——比如四川话的"嘛""噻""咯"，东北话的"整""搁""老"，粤语的"嘅""咗""唔"\n';
        prompt += '  * 句子结构要符合方言习惯，而非普通话句式硬套方言词\n';
        prompt += '  * 保持"有文化的方言表达"，不低俗、不玩烂梗\n';
        prompt += '  * 让当地人读后会心一笑，外地人读后觉得"有那味儿"\n';
        prompt += '- 字数：不超过30字\n';
        prompt += '- 方言辨识度示例对比：\n';
        prompt += '  四川话版本：\n  ❌ 错误示范："这云层翻涌，巴适得板"\n  ✅ 正确示范："天老爷把云朵和得巴巴适适的，光从中间戳的眼眼飚出来，硬是安逸"\n\n';
        prompt += '  东北话版本：\n  ❌ 错误示范："这景色真美，老带劲了"\n  ✅ 正确示范："这云彩整得跟棉裤腰似的，老天爷搁中间儿开了个天窗，敞亮！"\n\n';
        prompt += '  粤语版本：\n  ❌ 错误示范："个天好靓，好犀利"\n  ✅ 正确示范："啲云厚到遮天，但係光都係要打条路出嚟，世界终归係光嘅"\n\n';
        prompt += '  河南话版本：\n  ❌ 错误示范："这风景真得劲儿"\n  ✅ 正确示范："老天爷把云彩堆得跟山样，中间扒开一道缝，光就淌下来了，得劲儿！"\n\n';
        prompt += '  上海话版本：\n  ❌ 错误示范："这个天老灵额"\n  ✅ 正确示范："迭个云厚是厚得唻，但光总归要寻着缝钻出来额，嗲是嗲得唻"\n\n';
        prompt += '## 地区选择逻辑\n用户选择的地区：' + region + '\n';
        prompt += '请根据用户选择的地区，使用对应的方言文化来表达"地方韵味"风格。\n如果用户未选择或选择了"北方"，使用"北方方言通用语"。\n\n';
        prompt += '## 输出格式\n请严格按照以下JSON格式返回，不要包含任何额外文字：\n';
        prompt += '{\n  "gufeng": "古风文案内容",\n  "xiandai": "现代文学文案内容",\n  "humor": "冷幽默文案内容",\n  "difang": "地方韵味文案内容"\n}\n\n';
        prompt += '## 附加规则\n';
        prompt += '1. 如果用户没有上传图片只有文字描述，请根据文字描述生成文案\n';
        prompt += '2. 如果用户既没有图片也没有文字，返回友好提示："请上传一张图片或描述一个场景"\n';
        prompt += '3. 不要编造拍摄场景（如"坐飞机"），只基于画面或文字本身进行创作\n';
        prompt += '4. 确保四句文案风格差异明显，不要雷同\n';
        prompt += '5. "地方韵味"风格的核心价值是"文化亲切感"，要让当地人读了会心一笑，外地人读了觉得有意思';
        if (userText) prompt += '\n\n---\n\n用户补充描述：' + userText;
        return prompt;
    }

    function callDoubao(prompt, imageBase64) {
        var endpoint = settings.endpoint || 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
        var modelName = settings.modelId || 'ep-20260701145348-vvc58';
        var messages = [{ role: 'user', content: [] }];
        if (imageBase64) {
            messages[0].content.push({ type: 'image_url', image_url: { url: imageBase64 } });
        }
        messages[0].content.push({ type: 'text', text: prompt });
        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + settings.apiKey },
            body: JSON.stringify({ model: modelName, messages: messages, temperature: 0.8, max_tokens: 800 })
        })
        .then(function(res) {
            if (!res.ok) throw new Error('API请求失败: ' + res.status);
            return res.json();
        })
        .then(function(data) {
            var content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
            if (content) parseAndShowResult(content);
            else throw new Error('返回数据格式错误');
        })
        .catch(function(err) {
            console.error('Doubao API error:', err);
            showToast('模型调用失败，使用本地模式', 'error');
            fallbackToLocal();
        });
    }

    function callGLM(prompt, imageBase64) {
        var endpoint = settings.endpoint || 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
        var modelName = 'glm-5v-turbo';
        var messages = [{ role: 'user', content: [] }];
        if (imageBase64) {
            messages[0].content.push({ type: 'image_url', image_url: { url: imageBase64 } });
        }
        messages[0].content.push({ type: 'text', text: prompt });
        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + settings.apiKey },
            body: JSON.stringify({ model: modelName, messages: messages, temperature: 0.8, max_tokens: 800 })
        })
        .then(function(res) {
            if (!res.ok) throw new Error('API请求失败: ' + res.status);
            return res.json();
        })
        .then(function(data) {
            var content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
            if (content) parseAndShowResult(content);
            else throw new Error('返回数据格式错误');
        })
        .catch(function(err) {
            console.error('GLM API error:', err);
            showToast('模型调用失败，使用本地模式', 'error');
            fallbackToLocal();
        });
    }

    function parseAndShowResult(content) {
        if (loadingInterval) { clearInterval(loadingInterval); loadingInterval = null; }
        var result = null;
        var jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try { result = JSON.parse(jsonMatch[0]); } catch (e) {}
        }
        if (!result) {
            var lines = content.split('\n').filter(function(l) { return l.trim(); });
            result = { object: '意境', emotion: '悠远', occasion: '日常', gufeng: '', xiandai: '', humor: '', difang: '' };
            lines.forEach(function(line) {
                if (line.indexOf('主体') !== -1 || line.indexOf('object') !== -1) result.object = line.replace(/.*[:：]/, '').trim();
                else if (line.indexOf('氛围') !== -1 || line.indexOf('情绪') !== -1 || line.indexOf('emotion') !== -1) result.emotion = line.replace(/.*[:：]/, '').trim();
                else if (line.indexOf('意境') !== -1 || line.indexOf('场合') !== -1 || line.indexOf('occasion') !== -1) result.occasion = line.replace(/.*[:：]/, '').trim();
                else if (line.indexOf('古风') !== -1 || line.indexOf('gufeng') !== -1) result.gufeng = line.replace(/.*[:：]/, '').trim();
                else if (line.indexOf('现代') !== -1 || line.indexOf('xiandai') !== -1) result.xiandai = line.replace(/.*[:：]/, '').trim();
                else if (line.indexOf('幽默') !== -1 || line.indexOf('冷幽默') !== -1 || line.indexOf('humor') !== -1) result.humor = line.replace(/.*[:：]/, '').trim();
                else if (line.indexOf('地方') !== -1 || line.indexOf('韵味') !== -1 || line.indexOf('difang') !== -1) result.difang = line.replace(/.*[:：]/, '').trim();
            });
        }
        loadingSection.hidden = true;
        resultSection.hidden = false;
        tagObject.textContent = result.object || '意境';
        tagEmotion.textContent = result.emotion || '悠远';
        tagOccasion.textContent = result.occasion || '日常';
        if (settings.styles.classic !== false && (result.gufeng || result.classic)) {
            resultClassic.textContent = result.gufeng || result.classic || '';
            document.querySelector('.style-classic').style.display = '';
        } else { document.querySelector('.style-classic').style.display = 'none'; }
        if (settings.styles.modern !== false && (result.xiandai || result.modern)) {
            resultModern.textContent = result.xiandai || result.modern || '';
            document.querySelector('.style-modern').style.display = '';
        } else { document.querySelector('.style-modern').style.display = 'none'; }
        if (settings.styles.humor !== false && result.humor) {
            resultHumor.textContent = result.humor || '';
            document.querySelector('.style-humor').style.display = '';
        } else { document.querySelector('.style-humor').style.display = 'none'; }
        if (settings.styles.difang !== false && result.difang) {
            resultDifang.textContent = result.difang || '';
            document.querySelector('.style-difang').style.display = '';
        } else { document.querySelector('.style-difang').style.display = 'none'; }
        scrollToResult();
    }

    function fallbackToLocal() {
        if (currentTab === 'text') generateFromText();
        else if (window.ml5) generateFromImage();
        else showMysteryResult();
    }

    function generateFromImage() {
        if (window.ml5 && window.ml5.imageClassifier) {
            if (model) classifyImage();
            else if (modelLoading) {
                var checkModel = setInterval(function() {
                    if (model) { clearInterval(checkModel); classifyImage(); }
                }, 200);
            } else {
                modelLoading = true;
                loadingText.textContent = '加载神识中...';
                var classifier = ml5.imageClassifier('MobileNet', function() {
                    model = classifier;
                    modelLoading = false;
                    classifyImage();
                });
            }
        } else {
            setTimeout(function() { showMysteryResult(); }, 1500);
        }
    }

    function classifyImage() {
        if (!model || !previewImage) { showMysteryResult(); return; }
        try {
            model.classify(previewImage, function(error, results) {
                if (error || !results || results.length === 0) { showMysteryResult(); return; }
                var label = results[0].label.toLowerCase();
                var category = findCategory(label);
                if (category && quoteLibrary[category]) showResult(quoteLibrary[category]);
                else showMysteryResult();
            });
        } catch (e) { showMysteryResult(); }
    }

    function findCategory(label) {
        for (var key in categoryMap) {
            if (label.indexOf(key) !== -1) return categoryMap[key];
        }
        return null;
    }

    function showMysteryResult() {
        if (loadingInterval) { clearInterval(loadingInterval); loadingInterval = null; }
        loadingSection.hidden = true;
        resultSection.hidden = false;
        tagObject.textContent = '神秘景象';
        tagEmotion.textContent = '莫测';
        tagOccasion.textContent = '天机';
        var poem = mysteriousPoems[Math.floor(Math.random() * mysteriousPoems.length)];
        resultClassic.textContent = poem;
        resultModern.textContent = '有些美，语言已经无法形容。';
        resultHumor.textContent = '这波啊，是人工智能也看不懂的高级。';
        resultDifang.textContent = '这玩意儿瞅着老玄乎了！';
        document.querySelector('.style-classic').style.display = '';
        document.querySelector('.style-modern').style.display = '';
        document.querySelector('.style-humor').style.display = '';
        document.querySelector('.style-difang').style.display = '';
        scrollToResult();
    }

    function generateFromText() {
        if (loadingInterval) { clearInterval(loadingInterval); loadingInterval = null; }
        var inputText = textInput.value.trim();
        var category = matchTextCategory(inputText);
        if (category && quoteLibrary[category]) showResult(quoteLibrary[category]);
        else showGenericResult(inputText);
    }

    function matchTextCategory(text) {
        var lower = text.toLowerCase();
        var keywords = {
            'sunset': ['夕阳', '晚霞', '黄昏', '落日', '日落'],
            'mountain': ['山', '爬山', '登顶', '高峰', '山川'],
            'sea': ['海', '大海', '海边', '沙滩', '海浪'],
            'city': ['城市', '夜景', '加班', '工作', '打工人'],
            'food': ['吃', '美食', '饭', '火锅', '烧烤'],
            'flower': ['花', '春天', '花园'],
            'rain': ['雨', '下雨', '雨天'],
            'night': ['夜', '星空', '月亮', '熬夜', '失眠']
        };
        for (var cat in keywords) {
            for (var i = 0; i < keywords[cat].length; i++) {
                if (lower.indexOf(keywords[cat][i]) !== -1) return cat;
            }
        }
        return null;
    }

    function showGenericResult(inputText) {
        loadingSection.hidden = true;
        resultSection.hidden = false;
        var keyword = extractKeyword(inputText);
        tagObject.textContent = keyword || '意境';
        tagEmotion.textContent = '悠远';
        tagOccasion.textContent = '独处';
        resultClassic.textContent = '此中有真意，欲辨已忘言。';
        resultModern.textContent = '生活不止眼前的苟且，还有诗和远方。';
        resultHumor.textContent = '这波操作，我给满分！';
        resultDifang.textContent = '这画面，方言说了才算。';
        document.querySelector('.style-classic').style.display = '';
        document.querySelector('.style-modern').style.display = '';
        document.querySelector('.style-humor').style.display = '';
        document.querySelector('.style-difang').style.display = '';
        scrollToResult();
    }

    function showResult(data) {
        if (loadingInterval) { clearInterval(loadingInterval); loadingInterval = null; }
        loadingSection.hidden = true;
        resultSection.hidden = false;
        tagObject.textContent = data.object;
        tagEmotion.textContent = data.emotion;
        tagOccasion.textContent = data.occasion;
        if (settings.styles.classic !== false) {
            resultClassic.textContent = data.classic[Math.floor(Math.random() * data.classic.length)];
            document.querySelector('.style-classic').style.display = '';
        } else { document.querySelector('.style-classic').style.display = 'none'; }
        if (settings.styles.modern !== false) {
            resultModern.textContent = data.modern[Math.floor(Math.random() * data.modern.length)];
            document.querySelector('.style-modern').style.display = '';
        } else { document.querySelector('.style-modern').style.display = 'none'; }
        if (settings.styles.humor !== false) {
            resultHumor.textContent = data.humor[Math.floor(Math.random() * data.humor.length)];
            document.querySelector('.style-humor').style.display = '';
        } else { document.querySelector('.style-humor').style.display = 'none'; }
        if (settings.styles.difang !== false) {
            resultDifang.textContent = data.difang ? data.difang[Math.floor(Math.random() * data.difang.length)] : '这画面，方言说了才算。';
            document.querySelector('.style-difang').style.display = '';
        } else { document.querySelector('.style-difang').style.display = 'none'; }
        scrollToResult();
    }

    function extractKeyword(text) {
        if (!text) return '';
        var words = text.split(/[，。、？！\s,.!?]+/);
        return words[0] || '';
    }

    function scrollToResult() {
        if (typeof incrementVisitCounter === 'function') incrementVisitCounter();
        setTimeout(function() {
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    function initCopyButtons() {
        copyBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var style = this.getAttribute('data-copy');
                var text = '';
                switch (style) {
                    case 'classic': text = resultClassic.textContent; break;
                    case 'modern': text = resultModern.textContent; break;
                    case 'humor': text = resultHumor.textContent; break;
                    case 'difang': text = resultDifang.textContent; break;
                }
                if (text && text !== '-' && text !== '——') {
                    copyToClipboard(text);
                    markCopied(btn);
                }
            });
        });
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(function() {
                showToast('已复制 · 速去发圈', 'success');
            }).catch(function() { fallbackCopy(text); });
        } else { fallbackCopy(text); }
    }

    function fallbackCopy(text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.width = '1px';
        textarea.style.height = '1px';
        textarea.style.padding = '0';
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.boxShadow = 'none';
        textarea.style.background = 'transparent';
        textarea.style.opacity = '0.01';
        textarea.setAttribute('readonly', '');
        document.body.appendChild(textarea);
        try {
            textarea.focus();
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);
            var success = document.execCommand('copy');
            if (success) {
                showToast('已复制 · 速去发圈', 'success');
            } else {
                showManualCopyTip(text);
            }
        } catch (e) {
            showManualCopyTip(text);
        }
        setTimeout(function() {
            if (textarea && textarea.parentNode) {
                textarea.parentNode.removeChild(textarea);
            }
        }, 200);
    }

    function showManualCopyTip(text) {
        var tip = document.createElement('div');
        tip.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
        tip.innerHTML = '<div style="background:#fff;border-radius:12px;padding:20px;max-width:320px;width:100%;"><p style="font-size:14px;color:#333;margin-bottom:10px;font-weight:600;">长按下方文字复制</p><div id="manualCopyText" style="background:#f5f5f5;padding:12px;border-radius:8px;font-size:14px;color:#333;line-height:1.6;word-break:break-all;user-select:text;-webkit-user-select:text;max-height:200px;overflow-y:auto;">' + text.replace(/</g, '&lt;') + '</div><button id="manualCopyClose" style="margin-top:12px;width:100%;padding:10px;background:#b53a2f;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer;">知道了</button></div>';
        document.body.appendChild(tip);
        tip.addEventListener('click', function(e) {
            if (e.target === tip || e.target.id === 'manualCopyClose') {
                document.body.removeChild(tip);
            }
        });
    }

    function markCopied(btn) {
        var originalHTML = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(function() {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
        }, 2000);
    }

    function showToast(message, type) {
        if (toastTimeout) clearTimeout(toastTimeout);
        toastText.textContent = message;
        if (type === 'error') {
            copyToast.style.borderColor = '#d45a4e';
            toastSeal.style.background = '#d45a4e';
            toastSeal.textContent = '!';
        } else {
            copyToast.style.borderColor = '';
            toastSeal.style.background = '';
            toastSeal.textContent = '✓';
        }
        copyToast.classList.add('show');
        toastTimeout = setTimeout(function() {
            copyToast.classList.remove('show');
            toastTimeout = null;
        }, 2000);
    }

    function initRetry() {
        retryBtn.addEventListener('click', function() {
            resultSection.hidden = true;
            loadingSection.hidden = true;
            inputSection.style.display = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function isShareApiReliable() {
        if (!navigator.share) return false;
        var ua = navigator.userAgent || '';
        if (ua.indexOf('Quark') > -1 || ua.indexOf('UCBrowser') > -1 || ua.indexOf('MQQBrowser') > -1) {
            return false;
        }
        if (ua.indexOf('MiuiBrowser') > -1 || ua.indexOf('XiaoMi') > -1) {
            return false;
        }
        return true;
    }

    function initShare() {
        shareBtn.addEventListener('click', function() {
            var parts = [];
            if (settings.styles.classic !== false && resultClassic.textContent && resultClassic.textContent !== '——')
                parts.push('【古风】' + resultClassic.textContent);
            if (settings.styles.modern !== false && resultModern.textContent && resultModern.textContent !== '——')
                parts.push('【现代】' + resultModern.textContent);
            if (settings.styles.humor !== false && resultHumor.textContent && resultHumor.textContent !== '——')
                parts.push('【吐槽】' + resultHumor.textContent);
            if (settings.styles.difang !== false && resultDifang.textContent && resultDifang.textContent !== '——')
                parts.push('【乡音】' + resultDifang.textContent);
            if (parts.length === 0) {
                showToast('请先生成文案', 'error');
                return;
            }
            var text = parts.join('\n');
            if (isShareApiReliable()) {
                navigator.share({
                    title: '人前显圣 · 文化急救',
                    text: text,
                    url: window.location.href
                }).then(function() {
                    showToast('分享成功', 'success');
                }).catch(function(err) {
                    if (err.name !== 'AbortError') {
                        copyToClipboard(text);
                    }
                });
            } else {
                copyToClipboard(text);
            }
        });
    }

    function initDemo() {
        demoBtn.addEventListener('click', function() {
            var demoImages = [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
                'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800'
            ];
            var randomImg = demoImages[Math.floor(Math.random() * demoImages.length)];
            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                try {
                    var dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    currentFile = { name: 'demo.jpg' };
                    previewImage.src = dataUrl;
                    previewWrap.hidden = false;
                    uploadPlaceholder.style.display = 'none';
                    currentTab = 'image';
                    var imageTab = document.querySelector('.tab-btn[data-tab="image"]');
                    if (imageTab) imageTab.click();
                    startGeneration();
                } catch (e) {
                    showToast('演示图片加载失败，请手动上传', 'error');
                }
            };
            img.onerror = function() {
                showToast('演示图片加载失败，请手动上传', 'error');
            };
            img.src = randomImg;
        });
    }

    function initPoster() {
        posterBtn.addEventListener('click', function() {
            if (!resultClassic.textContent || resultClassic.textContent === '——') {
                showToast('请先生成文案', 'error');
                return;
            }
            generatePoster();
        });
        posterClose.addEventListener('click', function() {
            posterOverlay.classList.remove('show');
        });
        posterOverlay.addEventListener('click', function(e) {
            if (e.target === posterOverlay) posterOverlay.classList.remove('show');
        });
    }

    function generatePoster() {
        showToast('海报生成中...', 'success');
        ptImage.src = previewImage.src || '';
        var quotes = [];
        if (settings.styles.classic !== false && resultClassic.textContent && resultClassic.textContent !== '——') {
            quotes.push({ cls: 'classic', label: '古风', text: resultClassic.textContent });
        }
        if (settings.styles.modern !== false && resultModern.textContent && resultModern.textContent !== '——') {
            quotes.push({ cls: 'modern', label: '现代文学', text: resultModern.textContent });
        }
        if (settings.styles.humor !== false && resultHumor.textContent && resultHumor.textContent !== '——') {
            quotes.push({ cls: 'humor', label: '冷幽默', text: resultHumor.textContent });
        }
        if (settings.styles.difang !== false && resultDifang.textContent && resultDifang.textContent !== '——') {
            quotes.push({ cls: 'difang', label: '地方韵味', text: resultDifang.textContent });
        }
        ptQuotes.innerHTML = '';
        quotes.forEach(function(q) {
            var div = document.createElement('div');
            div.className = 'pt-quote ' + q.cls;
            div.innerHTML = '<div class="pt-quote-label">' + q.label + '</div><div class="pt-quote-text">' + q.text + '</div>';
            ptQuotes.appendChild(div);
        });
        if (typeof html2canvas === 'undefined') {
            showToast('海报库加载失败', 'error');
            return;
        }
        html2canvas(posterTemplate, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#f5efe2',
            logging: false
        }).then(function(canvas) {
            posterImage.src = canvas.toDataURL('image/png');
            posterOverlay.classList.add('show');
        }).catch(function(err) {
            console.error('Poster error:', err);
            showToast('海报生成失败', 'error');
        });
    }

    function initVisitCounter() {
        fetch('https://api.countapi.xyz/get/renqianxiansheng/v1').then(function(res) {
            return res.json();
        }).then(function(data) {
            var count = parseInt(data.value || '2847', 10);
            visitCountEl.textContent = count;
        }).catch(function() {
            visitCountEl.textContent = '2847';
        });
    }

    function incrementVisitCounter() {
        fetch('https://api.countapi.xyz/hit/renqianxiansheng/v1').then(function(res) {
            return res.json();
        }).then(function(data) {
            var count = parseInt(data.value || '2847', 10);
            visitCountEl.textContent = count;
        }).catch(function() {});
    }
});