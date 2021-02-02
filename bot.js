const  Discord  =  require ( 'discord.js' ) ;

// const {TOKEN} = require ('./ config.json');
const  { salutations }  =  require ( './data.json' ) ;

 client  const =  nouveau  Discord . Client ( ) ;

 préfixe  const =  '!' ;

var  isPlaying  =  false ;
var  voiceChannel ,  répartiteur ;

/ * Initialisation du bot * /

client . login ( process . env . TOKEN ) ;

client . on ( 'prêt' ,  ( )  =>  {
    console . log ( `Connecté en tant que $ { client . user . tag } !` ) ;
} ) ;

/ * Traitement lors de la réception de messages * /

client . on ( 'message' ,  message  =>  {

    if  ( ! message . contenu . commence avec ( préfixe )  ||  message . auteur . bot )  return ;

    const  args  =  message . contenu . tranche ( préfixe . longueur ) . split ( '' ) ;
     commande  const =  args . shift ( ) . toLowerCase ( ) ;

    if  ( commande  ===  "ping" )  {
        message . canal . envoyer ( "pong" ) ;
    }

    if  ( commande  ===  "bip" )  {
        message . réponse ( "boop" ) ;
    }

    if  ( commande  ===  "incorporer" )  {
        laissez  embedMessage  =  new  Discord . RichEmbed ( )
            . setColor ( "# 0099ff" )
            . setTitle ( message . auteur . nom d'utilisateur )
            . setURL ( message . auteur . avatarURL )
            . setAuthor ( client . utilisateur . nom d'utilisateur ,  client . utilisateur . avatarURL ,  client . utilisateur . avatarURL )
            . setDescription ( "Propriétés de"  +  message . auteur . nom d'utilisateur  +  "." )
            . addField ( "Tag" ,  message . author . tag )
            . setThumbnail ( message . auteur . avatarURL )
            . setTimestamp ( )
            . setFooter ( client . utilisateur . nom d'utilisateur ,  client . utilisateur . avatarURL ) ;
        message . canal . envoyer ( embedMessage ) ;
    }

    if  ( commande  ===  "play" )  {
        if  ( ! isPlaying )  {
            isPlaying  =  vrai ;
            voiceChannel  =  message . membre . voiceChannel ;
            essayez  {
                voiceChannel . joindre ( ) . puis ( connexion  =>  {
                    essayez  {
                        dispatcher  =  connexion . playArbitraryInput ( args [ 0 ] ) ;
                        répartiteur . on ( 'fin' ,  ( )  =>  {
                            connexion . déconnecter ( ) ;
                            isPlaying  =  false ;
                        } ) ;
                    }  catch  ( e )  {
                        message . réponse ( "il m'est malheuresement impossible de lire cette musique." ) ;
                        connexion . déconnecter ( ) ;
                        isPlaying  =  false ;
                    }
                } ) ;
            }  catch  ( e )  {
                message . réponse ( "je regrette, vous n'êtes pas en vocal." ) ;
                isPlaying  =  false ;
            }
        }  else  {
            message . réponse ( "je suis déjà - Occupé ma You can Arrêter` Avec précédente Tâche de stop`.!." ) ;
        }
    }

    if  ( commande  ===  "volume"  &&  isPlaying )  {
        if  ( args [ 0 ] > = 0  &&  args [ 0 ] <= 100 )  {
            message . canal . send ( "Volume réglé à"  +  args [ 0 ]  +  "%." ) ;
            répartiteur . setVolume ( args [ 0 ] / 100 ) ;
        }  else  {
            message . canal . send ( "Le volume doit être entre 0 et 100." ) ;
        }
    }

    if  ( commande  ===  "pause"  &&  isPlaying )  {
        répartiteur . pause ( ) ;
    }

    if  ( commande  ===  "reprendre"  &&  isPlaying )  {
        répartiteur . reprendre ( ) ;
    }

    if  ( commande  ===  "stop"  &&  isPlaying )  {
        répartiteur . end ( ) ;
        voiceChannel . congé ( ) ;
        isPlaying  =  false ;
    }

} ) ;

/ * À l'arrivé d'un nouveau membre * /

client . on ( 'guildMemberAdd' ,  membre  =>  {
     canal  const =  membre . guilde . canaux . find ( ch  =>  ch . nom  ===  'général' ) ;
    if  ( ! canal )  return ;

    laissez  random_number  =  Math . floor ( Math . random ( ) * Math . floor ( salutations . longueur ) ) ;
    let  random_greeting  =  salutations [ numéro_aléatoire ] ;

    canal . send ( ` $ { random_greeting }  $ { membre } !` ) ;
} ) ;

/ * Simuler un nouvel arrivant * /

client . on ( 'message' ,  message asynchrone  => {  
    if  ( message . content  ===  '! rejoindre' )  {
        client . emit ( 'guildMemberAdd' , un  message . Membre  ||  await un  message . guilde . fetchMember ( un message . auteur ) ) ;
    }
} ) ;