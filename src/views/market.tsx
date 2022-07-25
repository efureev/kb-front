import '@/styles/market/index.scss'
import { useMarket } from '@/store/market'

export default defineComponent({
  name: 'Markets',
  async setup() {
    const marketStore = useMarket()
    await marketStore.getList()
    const { fruitList } = marketStore

    return { fruitList }
  },
  render() {
    return (
      <div>
        <h3>FruitList</h3>
        <table className="table">
          <thead>
            <tr>
              <th className="c-#67c23a">ID</th>
              <th className="c-#e6a23c">Name</th>
              <th className="c-#79bbff">Price</th>
            </tr>
          </thead>

          <tbody>
            {this.fruitList.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="c-#67c23a">{item.id}</td>
                  <td className="c-#e6a23c">{item.name}</td>
                  <td className="c-#79bbff">${item.price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  },
})
