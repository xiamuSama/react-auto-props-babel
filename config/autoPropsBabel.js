const types = require('@babel/types')
const parser = require('@babel/parser');

function AddCustomerProps() {
      return {
        visitor: {
          // 针对函数调用的单独逻辑处理
          CallExpression(path, state) {
            // 只处理 React.createElement 函数调用
            let {callee} = path.node;
            
            if (
              !(
                types.isMemberExpression(callee) &&
                types.isIdentifier(callee.object) &&
                callee.object.name === 'React' &&
                types.isIdentifier(callee.property) &&
                callee.property.name === 'createElement'
              )
            ) {
              return
            }
            // console.log('path', path);

            // 从第一个参数获取组件名称（Button）,第二个参数获取组件属性
            let [ element, propsExpression ] = path.node.arguments
            let elementType
            if (types.isStringLiteral(element)) {
              elementType = element.value
            } else if (types.isIdentifier(element)) {
              elementType = element.name
            }
            // 自定义节点
            const options = state.opts
            let extraProps = options[elementType]
            // 没有匹配上就终止
            if (!extraProps) {
              return
            }
            // 获取文件相对位置
            let { cwd, filename } = state;
            let fileUrl = filename.replace(cwd, '')

            // console.log(55, fileUrl, extraProps);
            // 利用 parser.parseExpression 方法以及生成一个 ObjectExpression
            let stringLiteral = JSON.stringify(extraProps).replace('{FILE_SOURCE}', fileUrl)
            // console.log('stringLiteral', stringLiteral);
            let extraPropsExpression = parser.parseExpression(stringLiteral);

            // console.log('extraPropsExpression', extraPropsExpression)
            // 如果组件原本 props 为空，直接将自定义属性作为属性参数
            if (types.isNullLiteral(propsExpression)) {
              path.node.arguments[1] = extraPropsExpression
            } else if (types.isObjectExpression(propsExpression)) {
              // 自定义属性与原属性进行合并（只处理对象类型的 props）
              path.node.arguments[1] = types.objectExpression(
                propsExpression.properties.concat(
                  extraPropsExpression.properties,
                ),
              )
            }
          },
        },
      }
  };
  

  module.exports = AddCustomerProps 