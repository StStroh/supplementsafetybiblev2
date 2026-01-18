/**
 * Sales Intent Agent for Certified Nutra Labs
 * Analyzes customer behavior and generates actionable sales intelligence
 */

function analyzeSalesIntent(payload) {
  const {
    session_id,
    event_type,
    search_terms = [],
    checker_items = [],
    page_path = '',
    repeat_count = 0,
    time_on_page_seconds = 0,
    format_interest = [],
    compliance_keywords = []
  } = payload;

  // Detect intent level
  const intent = detectIntent({
    repeat_count,
    format_interest,
    compliance_keywords,
    event_type,
    checker_items,
    page_path
  });

  // Infer customer needs
  const customerNeed = inferCustomerNeed({
    search_terms,
    checker_items,
    format_interest,
    compliance_keywords,
    page_path
  });

  // Match offer
  const offer = matchOffer(customerNeed, intent);

  // Decide sales action
  const salesAction = decideSalesAction(intent, customerNeed);

  // Generate sales message
  const salesMessage = generateSalesMessage(intent, customerNeed, offer);

  // Internal signal for follow-up
  const internalSignal = generateInternalSignal(intent, customerNeed, repeat_count);

  return {
    intent: {
      level: intent.level,
      confidence: intent.confidence,
      urgency: intent.urgency
    },
    customer_need: {
      product_type: customerNeed.product_type,
      format: customerNeed.format,
      buyer_type: customerNeed.buyer_type,
      constraints: customerNeed.constraints
    },
    offer: {
      recommended: offer.recommended,
      time_to_quote: offer.time_to_quote,
      next_step: offer.next_step
    },
    sales_action: {
      priority: salesAction.priority,
      cta: salesAction.cta
    },
    sales_message: salesMessage,
    internal_signal: {
      lead_score: internalSignal.lead_score,
      follow_up: internalSignal.follow_up,
      timing: internalSignal.timing
    }
  };
}

function detectIntent({ repeat_count, format_interest, compliance_keywords, event_type, checker_items, page_path }) {
  let level = 'RESEARCH';
  let confidence = 30;
  let urgency = 'low';

  // Compliance keywords = purchase-ready
  if (compliance_keywords.length > 0) {
    level = 'PURCHASE_READY';
    confidence = 85;
    urgency = 'high';
  }
  // Format + dosage = pre-purchase
  else if (format_interest.length > 0 && checker_items.length > 0) {
    level = 'PRE_PURCHASE';
    confidence = 70;
    urgency = 'medium';
  }
  // Checker usage = validation
  else if (event_type === 'checker_run' || checker_items.length > 0) {
    level = 'VALIDATION';
    confidence = 50;
    urgency = 'low';
  }
  // Pricing page = pre-purchase
  else if (page_path.includes('/pricing') || page_path.includes('/services')) {
    level = 'PRE_PURCHASE';
    confidence = 60;
    urgency = 'medium';
  }

  // Escalate on repeats
  if (repeat_count >= 2) {
    if (level === 'RESEARCH') level = 'VALIDATION';
    else if (level === 'VALIDATION') level = 'PRE_PURCHASE';
    else if (level === 'PRE_PURCHASE') level = 'PURCHASE_READY';

    confidence = Math.min(confidence + 15, 95);
    urgency = urgency === 'low' ? 'medium' : 'high';
  }

  return { level, confidence, urgency };
}

function inferCustomerNeed({ search_terms, checker_items, format_interest, compliance_keywords, page_path }) {
  let product_type = 'supplement';
  let format = 'capsule';
  let buyer_type = 'brand_owner';
  let constraints = [];

  const allTerms = [...search_terms, ...checker_items].map(t => t.toLowerCase());

  if (allTerms.some(t => t.includes('protein') || t.includes('whey'))) {
    product_type = 'protein_powder';
    format = 'powder';
  } else if (allTerms.some(t => t.includes('multivitamin') || t.includes('vitamin'))) {
    product_type = 'multivitamin';
  } else if (allTerms.some(t => t.includes('omega') || t.includes('fish oil'))) {
    product_type = 'softgel';
    format = 'softgel';
  } else if (allTerms.some(t => t.includes('gummy') || t.includes('gummies'))) {
    product_type = 'gummy';
    format = 'gummy';
  }

  if (format_interest.length > 0) {
    format = format_interest[0].toLowerCase();
  }

  if (page_path.includes('/premium') || page_path.includes('/pricing')) {
    buyer_type = 'startup_brand';
  }

  if (compliance_keywords.length > 0) {
    constraints.push('compliance_required');
    if (compliance_keywords.some(k => k.toLowerCase().includes('amazon'))) {
      constraints.push('amazon_ready');
    }
    if (compliance_keywords.some(k => k.toLowerCase().includes('nsf') || k.toLowerCase().includes('gmp'))) {
      constraints.push('certification_required');
    }
  }

  return { product_type, format, buyer_type, constraints };
}

function matchOffer(customerNeed, intent) {
  let recommended = 'Stock Formula Consultation';
  let time_to_quote = '24 hours';
  let next_step = 'Schedule a call';

  if (intent.level === 'PURCHASE_READY') {
    if (customerNeed.format === 'powder') {
      recommended = 'Custom Powder Formulation';
      time_to_quote = '48 hours';
    } else if (customerNeed.format === 'softgel') {
      recommended = 'Softgel Production Run';
      time_to_quote = '48 hours';
    } else {
      recommended = 'Capsule Production + Labeling';
      time_to_quote = '24 hours';
    }
    next_step = 'Request detailed quote';
  } else if (intent.level === 'PRE_PURCHASE') {
    recommended = 'Sample Pack + MOQ Quote';
    time_to_quote = '24 hours';
    next_step = 'Request samples';
  }

  return { recommended, time_to_quote, next_step };
}

function decideSalesAction(intent, customerNeed) {
  let priority = 'low';
  let cta = 'Learn more';

  if (intent.level === 'PURCHASE_READY') {
    priority = 'high';
    cta = 'Request Quote';
  } else if (intent.level === 'PRE_PURCHASE') {
    priority = 'medium';
    cta = 'Get Pricing';
  }

  return { priority, cta };
}

function generateSalesMessage(intent, customerNeed, offer) {
  if (intent.level === 'RESEARCH' || intent.level === 'VALIDATION') {
    return '';
  }

  if (intent.level === 'PURCHASE_READY') {
    const cert = customerNeed.constraints.includes('certification_required')
      ? 'full GMP certification'
      : 'high quality standards';
    return `We manufacture ${customerNeed.product_type} with ${cert}. Quote ready in ${offer.time_to_quote}.`;
  }

  if (intent.level === 'PRE_PURCHASE') {
    return `Looking for a ${customerNeed.format} manufacturer? We can help with formulation, production, and compliance. Quick quotes available.`;
  }

  return '';
}

function generateInternalSignal(intent, customerNeed, repeat_count) {
  let lead_score = 20;
  let follow_up = 'wait';
  let timing = '7 days';

  if (intent.level === 'PURCHASE_READY') {
    lead_score = 85;
    follow_up = 'call';
    timing = 'immediate';
  } else if (intent.level === 'PRE_PURCHASE') {
    lead_score = 60;
    follow_up = 'email';
    timing = '24 hours';
  } else if (intent.level === 'VALIDATION') {
    lead_score = 40;
    follow_up = 'email';
    timing = '3 days';
  }

  lead_score = Math.min(lead_score + (repeat_count * 10), 100);

  return { lead_score, follow_up, timing };
}

module.exports = { analyzeSalesIntent };
