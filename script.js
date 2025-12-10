// ===================================================================
// 1. إعدادات الأسئلة والمسارات (Configuration)
// ===================================================================

const questionsConfig = {
    'PII': { 
        title: "1. جمع المعلومات الشخصية", 
        type: 'text_inputs',
        inputs: [
            { id: 'id_number', label: 'رقم الهوية', type: 'text', required: true },
            { id: 'full_name', label: 'الاسم الثلاثي', type: 'text', required: true },
            { id: 'age', label: 'العمر', type: 'number', required: true },
            { id: 'phone', label: 'رقم الجوال', type: 'text', required: true },
            { id: 'gender', label: 'الجنس', type: 'select', options: ['اختر الجنس', 'ذكر', 'أنثى'], required: true }
        ]
    },

    'Q1_Screening': { 
        title: "2. الأعراض الخطيرة (تحديد الطوارئ القصوى)", 
        type: 'radio',
        question: "هل تعاني من أياً من هذه الأعراض الآن؟", 
        options: [
            'صعوبة شديدة ومفاجئة في التنفس والبلع', 
            'نزيف لا يتوقف', 
            'تورم كبير ينتشر بسرعة إلى الرقبة أو أسفل العين', 
            'لا أخرى'
        ]
    },

    'Q2_MainProblem': { 
        title: "3. المشكلة الرئيسية", 
        type: 'radio_with_text',
        question: "ما هي المشكلة الرئيسية التي تعاني منها؟", 
        options: [
            'ألم شديد', 
            'تورم / خراج', 
            'كسر بالأسنان', 
            'سقوط حشوة أو تركيبة', 
            'أخرى' 
        ],
        textAreaFor: 'أخرى',
        maxlength: 500
    },

    'Pain_Location': {
        title: "تفاصيل الألم (المسار أ)",
        type: 'radio_with_input',
        question: "هل يمكنك تحديد مكان الألم بوضوح؟",
        options: [
            'نعم، سن محدد', 
            'لا، ألم عام في الفك أو الوجه', 
            'ألم ينتشر من سن إلى الرأس/الأذن'
        ],
        inputFor: 'نعم، سن محدد',
        inputPlaceholder: 'أدخل رقم السن هنا (مثال: 36)'
    },
    'Pain_Severity': {
        title: "تفاصيل الألم (المسار أ)",
        type: 'radio',
        question: "مدى شدة الألم؟",
        options: ['خفيف', 'متوسط', 'شديد']
    },
    'Pain_Nature': {
        title: "تفاصيل الألم (المسار أ)",
        type: 'radio',
        question: "هل الألم يزول بسرعة أم يستمر لفترة طويلة؟",
        options: [
            'يزول الألم فوراً أو بعد ثوانٍ قليلة', 
            'يستمر الألم طويلاً (أكثر من دقيقة)',
            'الألم مستمر في جميع الأوقات/يحدث تلقائياً'
        ]
    },
    'Pain_Sleep': {
        title: "تفاصيل الألم (المسار أ)",
        type: 'radio',
        question: "هل الألم يوقظك من النوم؟",
        options: ['نعم', 'لا']
    },
    
    'Additional_Health': {
        title: "5. الحالات الصحية الإضافية",
        type: 'checkbox_conditional',
        question: "هل لديك أي من هذه الحالات التالية؟ (يمكن اختيار أكثر من خيار)",
        options: [
            'حساسية من دواء أو مضاد',
            'مشاكل صحية مزمنة',
            'أتناول أدوية مسيلة للدم',
            'حامل' 
        ],
        conditionalInputs: [
            { for: 'حساسية من دواء أو مضاد', placeholder: 'حدد الدواء ونوع الحساسية' },
            { for: 'مشاكل صحية مزمنة', placeholder: 'حدد نوع المشكلة (مثل السكري، القلب)' }
        ],
        finalOption: 'لا يوجد'
    },
    
    'End_Triage': {
        title: "تم استلام الطلب",
        type: 'end_screen',
        message: "تم إرسال حالتك بنجاح وهي الآن **قيد المراجعة** من قبل فريقنا الطبي. سيتم الرد عليك في أقرب وقت."
    },
    'URGENT_WARNING': {
        title: "تحذير طارئ",
        type: 'warning_screen',
        message: "تحذير طارئ: يجب التوجه فوراً لطوارئ المستشفى العام."
    }
};

// ===================================================================
// 2. حالة التطبيق (State)
// ===================================================================

let userAnswers = {}; 
let historyStack = []; 
let currentStep = 'PII'; 
let genderValue = ''; 

// ===================================================================
// 3. وظيفة تحديد الخطوة التالية (Navigation Logic)
// ===================================================================

function getNextStep(current, answer) {
    if (current === 'PII') return 'Q1_Screening';

    if (current === 'Q1_Screening') {
        if (answer.mainAnswer !== 'لا أخرى') {
            return 'URGENT_WARNING'; 
        }
        return 'Q2_MainProblem';
    }

    if (current === 'Q2_MainProblem') {
        switch (answer.mainAnswer) {
            case 'ألم شديد':
                return 'Pain_Location';
            case 'سقوط حشوة أو تركيبة':
                // افتراضياً نذهب إلى الألم إذا كان هناك أي شك
                return 'Pain_Location';
            default: // تورم/كسر/أخرى تذهب مباشرة للأسئلة الصحية مؤقتاً
                return 'Additional_Health'; 
        }
    }

    // المنطق التفصيلي لمسار الألم
    if (current === 'Pain_Location') return 'Pain_Severity';
    if (current === 'Pain_Severity') return 'Pain_Nature';
    if (current === 'Pain_Nature') return 'Pain_Sleep';
    if (current === 'Pain_Sleep') {
        return 'Additional_Health'; 
    }
    
    // نهاية جميع المسارات الفرعية
    if (current === 'Additional_Health') {
        return 'End_Triage';
    }

    return 'End_Triage';
}

// ===================================================================
// 4. وظيفة مساعدة لتنظيف الواجهة (Utility)
// ===================================================================

function clearAndPrepareContainer() {
    const container = document.getElementById('question-container');
    container.innerHTML = ''; 
    document.getElementById('message-area').style.display = 'none';
    return container;
}

// ===================================================================
// 5. وظيفة جمع الإجابات (Collect Answer Logic)
// ===================================================================

function collectAnswer(stepKey) {
    const data = {};
    const currentQuestionData = questionsConfig[stepKey];
    const container = document.getElementById('question-container');
    let isValid = true;

    // 1. PII Collection (حقول الإدخال)
    if (currentQuestionData.type === 'text_inputs') {
        const piiData = {};
        currentQuestionData.inputs.forEach(input => {
            const inputElement = document.getElementById(input.id);
            if (input.required && (!inputElement.value || inputElement.value === 'اختر الجنس')) {
                isValid = false;
                inputElement.style.border = '2px solid red';
                return;
            }
            piiData[input.id] = inputElement.value;
            inputElement.style.border = '1px solid #ddd';
        });
        if (!isValid) {
            alert("الرجاء ملء جميع الحقول المطلوبة.");
            return null;
        }
        // تحديث قيمة الجنس لضبط ظهور سؤال الحمل لاحقاً
        genderValue = piiData.gender; 
        return piiData;

    } 
    
    // 2. Radio/Checkbox Collection (خيارات)
    else if (currentQuestionData.type.startsWith('radio')) {
        const selectedRadio = container.querySelector(`input[name="${stepKey}"]:checked`);
        if (!selectedRadio) {
            alert("الرجاء اختيار خيار واحد للمتابعة.");
            return null;
        }
        
        data.mainAnswer = selectedRadio.value;
        
        // جمع النص الإضافي لـ 'أخرى' أو 'سن محدد'
        if (data.mainAnswer === currentQuestionData.textAreaFor) {
            const textArea = document.getElementById(`${stepKey}_textarea`);
            data.details = textArea ? textArea.value : '';
        }
        if (currentQuestionData.inputFor && data.mainAnswer === currentQuestionData.inputFor) {
             const inputElement = document.getElementById(`${stepKey}_input`);
             data.details = inputElement ? inputElement.value : '';
        }

        return data;

    } else if (currentQuestionData.type === 'checkbox_conditional') {
        const selectedChecks = Array.from(container.querySelectorAll(`input[name="${stepKey}"]:checked`)).map(c => c.value);
        
        if (selectedChecks.length === 0) {
             alert("الرجاء اختيار حالة أو اختيار 'لا يوجد'.");
             return null;
        }

        return { selected: selectedChecks };
    }

    return "No Answer Collected"; 
}

// ===================================================================
// 6. وظيفة عرض السؤال (Rendering Logic)
// ===================================================================

function renderQuestion(stepKey) {
    const container = clearAndPrepareContainer();
    const currentQuestionData = questionsConfig[stepKey];

    if (!currentQuestionData) return; 

    // التعامل مع شاشات النهاية والتحذير
    if (currentQuestionData.type === 'end_screen' || currentQuestionData.type === 'warning_screen') {
        document.getElementById('message-area').innerHTML = currentQuestionData.message;
        document.getElementById('message-area').style.display = 'block';
        document.getElementById('next-button').style.display = 'none';
        document.getElementById('back-button').style.display = 'none';
        
        if (currentQuestionData.type === 'end_screen') {
            // Placeholder: هنا يتم إرسال البيانات النهائية إلى الواجهة الخلفية (Backend)
            console.log("FINAL SUBMISSION DATA:", userAnswers);
        }
        return;
    }
    
    // عرض العنوان والسؤال
    const titleElement = document.createElement('h2');
    titleElement.textContent = currentQuestionData.title;
    container.appendChild(titleElement);

    if (currentQuestionData.question) {
        const qText = document.createElement('p');
        qText.textContent = currentQuestionData.question;
        container.appendChild(qText);
    }
    
    // *** منطق بناء عناصر الواجهة بناءً على نوع السؤال (Type) ***

    // 1. بناء حقول الإدخال النصي (PII - text_inputs)
    if (currentQuestionData.type === 'text_inputs') {
        currentQuestionData.inputs.forEach(input => {
            const wrapper = document.createElement('div');
            wrapper.className = 'input-group';
            
            const label = document.createElement('label');
            label.textContent = input.label + (input.required ? " *" : "") + ": ";
            label.setAttribute('for', input.id);
            wrapper.appendChild(label);
            
            let inputElement;
            if (input.type === 'select') {
                inputElement = document.createElement('select');
                input.options.forEach(optionText => {
                    const option = document.createElement('option');
                    option.value = optionText;
                    option.textContent = optionText;
                    inputElement.appendChild(option);
                });
            } else {
                inputElement = document.createElement('input');
                inputElement.type = input.type;
                inputElement.placeholder = input.label;
            }
            
            inputElement.id = input.id;
            // استرجاع القيمة السابقة
            inputElement.value = userAnswers.PII && userAnswers.PII[input.id] ? userAnswers.PII[input.id] : '';

            wrapper.appendChild(inputElement);
            container.appendChild(wrapper);
        });
    }

    // 2. بناء خيارات الراديو (radio)
    if (currentQuestionData.type.startsWith('radio')) {
        currentQuestionData.options.forEach((optionText, index) => {
            const inputId = `${stepKey}_option_${index}`;
            
            const label = document.createElement('label');
            label.className = 'option-label';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = stepKey; 
            radio.value = optionText;
            radio.id = inputId;
            
            // استرجاع القيمة السابقة
            if (userAnswers[stepKey] && userAnswers[stepKey].mainAnswer === optionText) {
                radio.checked = true;
            }

            label.appendChild(radio);
            label.appendChild(document.createTextNode(optionText));
            
            container.appendChild(label);

            // إضافة حقل النص الإضافي لـ (أخرى)
            if (optionText === currentQuestionData.textAreaFor) {
                 const textArea = document.createElement('textarea');
                 textArea.id = `${stepKey}_textarea`;
                 textArea.placeholder = 'صف مشكلتك بالتفصيل...';
                 textArea.maxLength = currentQuestionData.maxlength || 500;
                 textArea.style.width = '100%';
                 textArea.style.marginTop = '5px';
                 // استرجاع النص الإضافي
                 if (userAnswers[stepKey] && userAnswers[stepKey].details) {
                     textArea.value = userAnswers[stepKey].details;
                 }
                 container.appendChild(textArea);
            }
             // إضافة حقل النص الإضافي لـ (سن محدد)
            if (optionText === currentQuestionData.inputFor) {
                 const inputElement = document.createElement('input');
                 inputElement.type = 'text';
                 inputElement.id = `${stepKey}_input`;
                 inputElement.placeholder = currentQuestionData.inputPlaceholder || 'أدخل التفاصيل هنا';
                 inputElement.style.width = '100%';
                 inputElement.style.marginTop = '5px';
                 // استرجاع التفاصيل
                 if (userAnswers[stepKey] && userAnswers[stepKey].details) {
                     inputElement.value = userAnswers[stepKey].details;
                 }
                 container.appendChild(inputElement);
            }
        });
    }

    // 3. بناء خانات الاختيار (checkbox_conditional)
    if (currentQuestionData.type === 'checkbox_conditional') {
        currentQuestionData.options.forEach((optionText, index) => {
             const inputId = `${stepKey}_check_${index}`;
            
             const label = document.createElement('label');
             label.className = 'option-label';
            
             const checkbox = document.createElement('input');
             checkbox.type = 'checkbox';
             checkbox.name = stepKey;
             checkbox.value = optionText;
             checkbox.id = inputId;
             
             // إخفاء خيار 'حامل' إذا كان الجنس ذكراً
             if (optionText === 'حامل' && genderValue === 'ذكر') {
                 label.style.display = 'none';
             }

             // استرجاع القيم السابقة
             if (userAnswers[stepKey] && userAnswers[stepKey].selected && userAnswers[stepKey].selected.includes(optionText)) {
                 checkbox.checked = true;
             }

             label.appendChild(checkbox);
             label.appendChild(document.createTextNode(optionText));
             container.appendChild(label);

             // إضافة حقول الإدخال المشروطة
             const condition = currentQuestionData.conditionalInputs.find(i => i.for === optionText);
             if (condition) {
                 const conditionInput = document.createElement('input');
                 conditionInput.type = 'text';
                 conditionInput.id = `${stepKey}_details_${index}`;
                 conditionInput.placeholder = condition.placeholder;
                 conditionInput.style.display = 'none'; 
                 
                 // إضافة منطق إظهار/إخفاء الحقل النصي عند النقر على checkbox
                 checkbox.addEventListener('change', (e) => {
                     conditionInput.style.display = e.target.checked ? 'block' : 'none';
                 });
                 // إظهاره إذا كان محدداً مسبقاً
                 if (checkbox.checked) conditionInput.style.display = 'block';

                 container.appendChild(conditionInput);
             }
        });
    }
    
    // عرض زر الرجوع بشكل صحيح
    document.getElementById('back-button').style.display = (historyStack.length > 0) ? 'inline-block' : 'none';
    document.getElementById('next-button').style.display = 'inline-block';
}

// ===================================================================
// 7. وظائف معالجة الأزرار (Event Handlers)
// ===================================================================

// معالج زر التالي
document.getElementById('next-button').addEventListener('click', () => {
    let answer = collectAnswer(currentStep);
    if (!answer) return;

    historyStack.push(currentStep);
    userAnswers[currentStep] = answer;
    
    currentStep = getNextStep(currentStep, answer);
    renderQuestion(currentStep);
});


// معالج زر الرجوع
document.getElementById('back-button').addEventListener('click', () => {
    if (historyStack.length > 0) {
        let previousStep = historyStack.pop(); 
        currentStep = previousStep;
        
        // إعادة عرض السؤال السابق
        renderQuestion(currentStep);
    }
});


// ===================================================================
// 8. بدء تشغيل التطبيق
// ===================================================================

// التأكد من تحميل الصفحة أولاً
document.addEventListener('DOMContentLoaded', () => {
    renderQuestion(currentStep);
});
