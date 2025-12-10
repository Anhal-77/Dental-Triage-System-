// ====== 1. تعريف جميع الأسئلة والمسارات (Configuration) ======
const questions = {
    'PII': { 
        title: "البيانات الشخصية", 
        inputs: ['رقم الهوية', 'الاسم الثلاثي', 'العمر', 'رقم الجوال', 'الجنس'] 
    },
    'Q1_Screening': { 
        title: "الأعراض الخطيرة", 
        question: "هل تعاني من أياً من هذه الأعراض الآن؟", 
        options: ['صعوبة شديدة ومفاجئة في التنفس والبلع', 'نزيف لا يتوقف', 'تورم كبير ينتشر بسرعة', 'لا أخرى'] 
    },
    // ... يضاف هنا باقي الأسئلة (Q2, Pain_Path, Swelling_Path, etc.)
};

// ====== 2. تعريف حالة التطبيق (State) ======
let userAnswers = {}; // لتخزين الإجابات
let historyStack = []; // لتتبع خطوات التنقل
let currentStep = 'PII'; // البدء بجمع المعلومات الشخصية

// ====== 3. وظيفة عرض السؤال (Rendering Logic) ======
function renderQuestion(stepKey) {
    // هذه الوظيفة مسؤولة عن قراءة البيانات من 'questions'
    // وبناء عناصر HTML (مثل الأزرار وحقول الإدخال)
    // ثم وضعها داخل العنصر #question-container في index.html
    
    // ... سيتم كتابة منطق عرض الأسئلة هنا ...
}

// ====== 4. وظيفة التنقل (Navigation Handlers) ======
document.getElementById('next-button').addEventListener('click', () => {
    // 1. جمع الإجابة من الواجهة
    let answer = collectAnswer(currentStep);
    if (!answer) return; // منع الانتقال إذا كانت الإجابة فارغة
    
    // 2. تحديث سجل التاريخ والحالة
    userAnswers[currentStep] = answer;
    historyStack.push(currentStep);
    
    // 3. تحديد الخطوة التالية بناءً على الإجابة
    currentStep = getNextStep(currentStep, answer);
    
    // 4. عرض الخطوة الجديدة
    renderQuestion(currentStep);
    
    // 5. إظهار زر الرجوع
    document.getElementById('back-button').style.display = 'inline-block';
});

document.getElementById('back-button').addEventListener('click', () => {
    // ... يتم تطبيق منطق زر الرجوع الذي ناقشناه هنا (handleBack) ...
});

// ====== 5. بدء التطبيق ======
renderQuestion(currentStep); // ابدأ بعرض سؤال PII

