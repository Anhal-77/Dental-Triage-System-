const questionsConfig = {
    // ----------------------------------------------------------------------
    // 1. جمع المعلومات الشخصية (PII)
    'PII': { 
        title: "1. جمع المعلومات الشخصية", 
        type: 'text_inputs',
        inputs: [
            { id: 'id_number', label: 'رقم الهوية', type: 'text' },
            { id: 'full_name', label: 'الاسم الثلاثي', type: 'text' },
            { id: 'age', label: 'العمر', type: 'number' },
            { id: 'phone', label: 'رقم الجوال', type: 'text' },
            { id: 'gender', label: 'الجنس', type: 'select', options: ['ذكر', 'أنثى'] }
        ]
    },

    // ----------------------------------------------------------------------
    // 2. السؤال الأول (الأعراض الخطيرة)
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

    // ----------------------------------------------------------------------
    // 3. السؤال الثاني (المشكلة الرئيسية)
    'Q2_MainProblem': { 
        title: "3. المشكلة الرئيسية", 
        type: 'radio_with_text',
        question: "ما هي المشكلة الرئيسية التي تعاني منها؟", 
        options: [
            'ألم شديد', 
            'تورم / خراج', 
            'كسر بالأسنان', 
            'سقوط حشوة أو تركيبة', 
            'أخرى' // هذا الخيار سيتطلب حقل نصي إضافي
        ],
        textAreaFor: 'أخرى',
        maxlength: 500
    },

    // ----------------------------------------------------------------------
    // 4. المسارات الفرعية للألم
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
    // ... يضاف باقي مسارات التورم والكسر هنا ...

    // ----------------------------------------------------------------------
    // 5. أسئلة الحالات الصحية الإضافية (تظهر في نهاية معظم المسارات)
    'Additional_Health': {
        title: "5. الحالات الصحية الإضافية",
        type: 'checkbox_conditional',
        question: "هل لديك أي من هذه الحالات التالية؟",
        options: [
            'حساسية من دواء أو مضاد',
            'مشاكل صحية مزمنة',
            'أتناول أدوية مسيلة للدم',
            'حامل' // سيتم إخفاء هذا الخيار إذا كان الجنس ذكراً
        ],
        // هذه الإعدادات تخبر البرنامج بضرورة ظهور حقول نصية إضافية للشرح
        conditionalInputs: [
            { for: 'حساسية من دواء أو مضاد', placeholder: 'حدد الدواء ونوع الحساسية' },
            { for: 'مشاكل صحية مزمنة', placeholder: 'حدد نوع المشكلة (مثل السكري، القلب)' }
        ],
        // هذا الخيار ينهي التدفق إذا تم اختياره لوحده
        finalOption: 'لا يوجد'
    },
    
    // ----------------------------------------------------------------------
    // 6. شاشات النهاية والحالة (End Screens)
    'End_Triage': {
        title: "نهاية التقييم",
        type: 'end_screen',
        message: "تم إرسال حالتك بنجاح وهي الآن **قيد المراجعة** من قبل فريقنا الطبي. سيتم الرد عليك في أقرب وقت."
    },
    'End_NoPain': {
        title: "تم الإرسال",
        type: 'end_screen',
        message: "حالتك غير طارئة. سيتم مراجعتها والرد عليك بخصوص تحديد موعد."
    }
};

// ... هنا سيتم وضع باقي الكود البرمجي (State, Handlers, etc.) ...

// ===================================================================
// 1. إعدادات الأسئلة والمسارات (Configuration)
// ===================================================================

const questionsConfig = {
    // ----------------------------------------------------------------------
    // 1. جمع المعلومات الشخصية (PII)
    'PII': { 
        title: "1. جمع المعلومات الشخصية", 
        type: 'text_inputs',
        inputs: [
            { id: 'id_number', label: 'رقم الهوية', type: 'text' },
            { id: 'full_name', label: 'الاسم الثلاثي', type: 'text' },
            { id: 'age', label: 'العمر', type: 'number' },
            { id: 'phone', label: 'رقم الجوال', type: 'text' },
            { id: 'gender', label: 'الجنس', type: 'select', options: ['ذكر', 'أنثى'] }
        ]
    },

    // ----------------------------------------------------------------------
    // 2. السؤال الأول (الأعراض الخطيرة)
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

    // ----------------------------------------------------------------------
    // 3. السؤال الثاني (المشكلة الرئيسية)
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

    // ----------------------------------------------------------------------
    // 4. المسارات الفرعية (جزء من المنطق فقط لتبسيط الكود)
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
    
    // ----------------------------------------------------------------------
    // 5. أسئلة الحالات الصحية الإضافية
    'Additional_Health': {
        title: "5. الحالات الصحية الإضافية",
        type: 'checkbox_conditional',
        question: "هل لديك أي من هذه الحالات التالية؟",
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
    
    // ----------------------------------------------------------------------
    // 6. شاشات النهاية والحالة 
    'End_Triage': {
        title: "نهاية التقييم",
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
// 2. وظيفة تحديد الخطوة التالية (Navigation Logic)
// ===================================================================

function getNextStep(current, answer) {
    // تحديد المسار الرئيسي
    if (current === 'PII') return 'Q1_Screening';

    if (current === 'Q1_Screening') {
        if (answer !== 'لا أخرى') {
            return 'URGENT_WARNING'; 
        }
        return 'Q2_MainProblem';
    }

    if (current === 'Q2_MainProblem') {
        switch (answer) {
            case 'ألم شديد':
                return 'Pain_Location';
            // يجب إضافة حالات التورم والكسر والحشوة هنا لاحقاً
            default: // يشمل 'تورم / خراج' و 'كسر بالأسنان' و 'أخرى' كمسار افتراضي مؤقت
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
// 3. حالة التطبيق (State)
// ===================================================================

let userAnswers = {}; 
let historyStack = []; 
let currentStep = 'PII'; 
let genderValue = ''; 

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
// 5. وظيفة عرض السؤال (Rendering Logic)
// *هذا القسم يحتاج إلى تفصيل أكبر لتشغيل كل أنواع الأسئلة*
// ===================================================================

function renderQuestion(stepKey) {
    const container = clearAndPrepareContainer();
    const currentQuestionData = questionsConfig[stepKey];

    if (!currentQuestionData) return; 

    // عرض شاشات النهاية والتحذير
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
    
    // (*** يجب إضافة منطق بناء الـ text_inputs, radio, checkbox هنا ***)

    // عرض زر الرجوع بشكل صحيح
    document.getElementById('back-button').style.display = (historyStack.length > 0) ? 'inline-block' : 'none';
    document.getElementById('next-button').style.display = 'inline-block';
}

// ===================================================================
// 6. وظائف معالجة الأزرار (Event Handlers)
// ===================================================================

function collectAnswer(stepKey) {
    // Placeholder: يجب كتابة منطق جمع الإجابة من الواجهة هنا
    // حالياً نستخدم قيمة افتراضية للاختبار:
    if (stepKey === 'Q1_Screening') return 'لا أخرى'; // لتجاوز التحذير
    if (stepKey === 'Q2_MainProblem') return 'ألم شديد'; // لبدء مسار الألم
    
    return "مثال للإجابة"; 
}


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
        renderQuestion(currentStep);
        // يجب هنا إعادة ملء الحقول بالإجابات المخزنة
    }
});


// ===================================================================
// 7. بدء تشغيل التطبيق
// ===================================================================

// التأكد من تحميل الصفحة أولاً
document.addEventListener('DOMContentLoaded', () => {
    renderQuestion(currentStep);
});
