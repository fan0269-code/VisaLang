"""New v2 experimental rule baseline, not VisaLang's existing manual form."""
import re

PATTERNS = {
    'family-reunion': r'团聚|团圆|与.{0,8}(?:妻子|丈夫|配偶|家人).{0,6}(?:长期生活|一起生活)',
    'b1': r'永居|永久居留|永久居民|入籍|定居许可',
    'ausbildung': r'职业培训|双元制|Ausbildung',
    'nursing': r'护士.{0,8}(?:认可|执业|注册)|护理执业',
    'university': r'大学|本科|硕士|博士|研究生|读研|留学',
    'other': r'旅游|度假|商务|展会|婚礼|工作签证|探亲',
}


def classify(text):
    if re.search(r'还没.{0,5}(?:决定|选|想好)|尚未|未定|拿不定|没有.{0,5}(?:决定|打算)|还不知道', text):
        return 'unclear'
    # Drop explicitly hypothetical future clauses and instruction-like clauses.
    clauses = re.split(r'[，。；！？,;!?]', text)
    current = [c for c in clauses if re.search(r'目前|现在|这次|当前|眼下|实际|真正的目的', c)]
    if current:
        clauses = current
    hits = set()
    for clause in clauses:
        if re.search(r'输出|答案|回答|以后|将来|未来', clause):
            continue
        if re.search(r'不(?:是|想|去|办|申请|打算)|既不|也不|更不', clause):
            continue
        hits.update(label for label, pattern in PATTERNS.items() if re.search(pattern, clause, re.I))
    return next(iter(hits)) if len(hits) == 1 else 'unclear'
