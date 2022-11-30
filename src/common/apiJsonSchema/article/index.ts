const params_id = {
  type: 'object',
  required: ['ll_id']
}

const params_article = {
  type: 'object',
  required: ['ll_title', 'll_titleEng', 'll_introduce', 'll_content', 'll_category', 'll_tags']
}

export { params_id, params_article }
