import'./styles.css'


export default function logon(){

    return(
        <div className="logon-container">
            <section className="form">
                <h1>faça seu login</h1>
                <form>
                    <input placeholder="Email" />
                    <input placeholder="Senha" type='password'/>
                    <button type="submit">Entrar</button>
                    <a href="#">Novo Cadastro</a>
                </form>
            </section>
        </div>
    )
}